"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructOrder = exports.Construct = exports.Node = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const dependency_1 = require("./dependency");
const stack_trace_1 = require("./private/stack-trace");
const uniqueid_1 = require("./private/uniqueid");
const CONSTRUCT_SYM = Symbol.for('constructs.Construct');
/**
 * Represents the construct node in the scope tree.
 */
class Node {
    constructor(host, scope, id) {
        this.host = host;
        this._locked = false; // if this is "true", addChild will fail
        this._children = {};
        this._context = {};
        this._metadata = new Array();
        this._dependencies = new Set();
        this._validations = new Array();
        id = id ?? ''; // if undefined, convert to empty string
        this.id = sanitizeId(id);
        this.scope = scope;
        if (scope && !this.id) {
            throw new Error('Only root constructs may have an empty ID');
        }
        // add to parent scope
        scope?.node.addChild(host, this.id);
    }
    /**
     * Returns the node associated with a construct.
     * @param construct the construct
     *
     * @deprecated use `construct.node` instead
     */
    static of(construct) {
        return construct.node;
    }
    /**
     * The full, absolute path of this construct in the tree.
     *
     * Components are separated by '/'.
     */
    get path() {
        const components = this.scopes.filter(c => c.node.id).map(c => c.node.id);
        return components.join(Node.PATH_SEP);
    }
    /**
     * Returns an opaque tree-unique address for this construct.
     *
     * Addresses are 42 characters hexadecimal strings. They begin with "c8"
     * followed by 40 lowercase hexadecimal characters (0-9a-f).
     *
     * Addresses are calculated using a SHA-1 of the components of the construct
     * path.
     *
     * To enable refactorings of construct trees, constructs with the ID `Default`
     * will be excluded from the calculation. In those cases constructs in the
     * same tree may have the same addreess.
     *
     * @example c83a2846e506bcc5f10682b564084bca2d275709ee
     */
    get addr() {
        if (!this._addr) {
            this._addr = uniqueid_1.addressOf(this.scopes.map(c => c.node.id));
        }
        return this._addr;
    }
    /**
     * Return a direct child by id, or undefined
     *
     * @param id Identifier of direct child
     * @returns the child if found, or undefined
     */
    tryFindChild(id) {
        return this._children[sanitizeId(id)];
    }
    /**
     * Return a direct child by id
     *
     * Throws an error if the child is not found.
     *
     * @param id Identifier of direct child
     * @returns Child with the given id.
     */
    findChild(id) {
        const ret = this.tryFindChild(id);
        if (!ret) {
            throw new Error(`No child with id: '${id}'`);
        }
        return ret;
    }
    /**
     * Returns the child construct that has the id `Default` or `Resource"`.
     * This is usually the construct that provides the bulk of the underlying functionality.
     * Useful for modifications of the underlying construct that are not available at the higher levels.
     *
     * @throws if there is more than one child
     * @returns a construct or undefined if there is no default child
     */
    get defaultChild() {
        if (this._defaultChild !== undefined) {
            return this._defaultChild;
        }
        const resourceChild = this.tryFindChild('Resource');
        const defaultChild = this.tryFindChild('Default');
        if (resourceChild && defaultChild) {
            throw new Error(`Cannot determine default child for ${this.path}. There is both a child with id "Resource" and id "Default"`);
        }
        return defaultChild || resourceChild;
    }
    /**
     * Override the defaultChild property.
     *
     * This should only be used in the cases where the correct
     * default child is not named 'Resource' or 'Default' as it
     * should be.
     *
     * If you set this to undefined, the default behavior of finding
     * the child named 'Resource' or 'Default' will be used.
     */
    set defaultChild(value) {
        this._defaultChild = value;
    }
    /**
     * All direct children of this construct.
     */
    get children() {
        return Object.values(this._children);
    }
    /**
     * Return this construct and all of its children in the given order
     */
    findAll(order = ConstructOrder.PREORDER) {
        const ret = new Array();
        visit(this.host);
        return ret;
        function visit(c) {
            if (order === ConstructOrder.PREORDER) {
                ret.push(c);
            }
            for (const child of c.node.children) {
                visit(child);
            }
            if (order === ConstructOrder.POSTORDER) {
                ret.push(c);
            }
        }
    }
    /**
     * This can be used to set contextual values.
     * Context must be set before any children are added, since children may consult context info during construction.
     * If the key already exists, it will be overridden.
     * @param key The context key
     * @param value The context value
     */
    setContext(key, value) {
        if (this.children.length > 0) {
            const names = this.children.map(c => c.node.id);
            throw new Error('Cannot set context after children have been added: ' + names.join(','));
        }
        this._context[key] = value;
    }
    /**
     * Retrieves a value from tree context.
     *
     * Context is usually initialized at the root, but can be overridden at any point in the tree.
     *
     * @param key The context key
     * @returns The context value or `undefined` if there is no context value for thie key.
     */
    tryGetContext(key) {
        const value = this._context[key];
        if (value !== undefined) {
            return value;
        }
        return this.scope && this.scope.node.tryGetContext(key);
    }
    /**
     * An immutable array of metadata objects associated with this construct.
     * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
     */
    get metadata() {
        return [...this._metadata];
    }
    /**
     * Adds a metadata entry to this construct.
     * Entries are arbitrary values and will also include a stack trace to allow tracing back to
     * the code location for when the entry was added. It can be used, for example, to include source
     * mapping in CloudFormation templates to improve diagnostics.
     *
     * @param type a string denoting the type of metadata
     * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
     * @param options options
     */
    addMetadata(type, data, options = {}) {
        if (data == null) {
            return;
        }
        const shouldTrace = options.stackTrace ?? false;
        const trace = shouldTrace ? stack_trace_1.captureStackTrace(options.traceFromFunction ?? this.addMetadata) : undefined;
        this._metadata.push({ type, data, trace });
    }
    /**
     * All parent scopes of this construct.
     *
     * @returns a list of parent scopes. The last element in the list will always
     * be the current construct and the first element will be the root of the
     * tree.
     */
    get scopes() {
        const ret = new Array();
        let curr = this.host;
        while (curr) {
            ret.unshift(curr);
            curr = curr.node.scope;
        }
        return ret;
    }
    /**
     * Returns the root of the construct tree.
     * @returns The root of the construct tree.
     */
    get root() {
        return this.scopes[0];
    }
    /**
     * Returns true if this construct or the scopes in which it is defined are
     * locked.
     */
    get locked() {
        if (this._locked) {
            return true;
        }
        if (this.scope && this.scope.node.locked) {
            return true;
        }
        return false;
    }
    /**
     * Add an ordering dependency on another construct.
     *
     * An `IDependable`
     */
    addDependency(...deps) {
        for (const d of deps) {
            this._dependencies.add(d);
        }
    }
    /**
     * Return all dependencies registered on this node (non-recursive).
     */
    get dependencies() {
        const result = new Array();
        for (const dep of this._dependencies) {
            for (const root of dependency_1.Dependable.of(dep).dependencyRoots) {
                result.push(root);
            }
        }
        return result;
    }
    /**
     * Remove the child with the given name, if present.
     *
     * @returns Whether a child with the given name was deleted.
     * @experimental
     */
    tryRemoveChild(childName) {
        if (!(childName in this._children)) {
            return false;
        }
        delete this._children[childName];
        return true;
    }
    /**
     * Adds a validation to this construct.
     *
     * When `node.validate()` is called, the `validate()` method will be called on
     * all validations and all errors will be returned.
     *
     * @param validation The validation object
     */
    addValidation(validation) {
        this._validations.push(validation);
    }
    /**
     * Validates this construct.
     *
     * Invokes the `validate()` method on all validations added through
     * `addValidation()`.
     *
     * @returns an array of validation error messages associated with this
     * construct.
     */
    validate() {
        const deprecated = ['validate', 'onValidate', 'synthesize', 'onSynthesize', 'prepare', 'onPrepare'];
        for (const method of deprecated) {
            if (typeof (this.host[method]) === 'function') {
                throw new Error(`the construct "${this.path}" has a "${method}()" method which is no longer supported. Use "construct.node.addValidation()" to add validations to a construct`);
            }
        }
        const errors = new Array();
        for (const v of this._validations) {
            errors.push(...v.validate());
        }
        return errors;
    }
    /**
     * Locks this construct from allowing more children to be added. After this
     * call, no more children can be added to this construct or to any children.
     */
    lock() {
        this._locked = true;
    }
    /**
     * Adds a child construct to this node.
     *
     * @param child The child construct
     * @param childName The type name of the child construct.
     * @returns The resolved path part name of the child
     */
    addChild(child, childName) {
        if (this.locked) {
            // special error if root is locked
            if (!this.path) {
                throw new Error('Cannot add children during synthesis');
            }
            throw new Error(`Cannot add children to "${this.path}" during synthesis`);
        }
        if (childName in this._children) {
            const name = this.id ?? '';
            const typeName = this.host.constructor.name;
            throw new Error(`There is already a Construct with name '${childName}' in ${typeName}${name.length > 0 ? ' [' + name + ']' : ''}`);
        }
        if (!childName && this.id) {
            throw new Error(`cannot add a nameless construct to the named scope: ${this.path}`);
        }
        this._children[childName] = child;
        if (Object.keys(this._children).length > 1 && Object.keys(this._children).filter(x => !x).length > 0) {
            throw new Error('only a single construct is allowed in a scope if it has an empty name');
        }
    }
}
exports.Node = Node;
_a = JSII_RTTI_SYMBOL_1;
Node[_a] = { fqn: "constructs.Node", version: "10.1.153" };
/**
 * Separator used to delimit construct path components.
 */
Node.PATH_SEP = '/';
/**
 * Represents the building block of the construct graph.
 *
 * All constructs besides the root construct must be created within the scope of
 * another construct.
 */
class Construct {
    /**
     * Creates a new construct node.
     *
     * @param scope The scope in which to define this construct
     * @param id The scoped construct ID. Must be unique amongst siblings. If
     * the ID includes a path separator (`/`), then it will be replaced by double
     * dash `--`.
     */
    constructor(scope, id) {
        this.node = new Node(this, scope, id);
        // implement IDependable privately
        dependency_1.Dependable.implement(this, {
            dependencyRoots: [this],
        });
    }
    /**
     * Checks if `x` is a construct.
     *
     * Use this method instead of `instanceof` to properly detect `Construct`
     * instances, even when the construct library is symlinked.
     *
     * Explanation: in JavaScript, multiple copies of the `constructs` library on
     * disk are seen as independent, completely different libraries. As a
     * consequence, the class `Construct` in each copy of the `constructs` library
     * is seen as a different class, and an instance of one class will not test as
     * `instanceof` the other class. `npm install` will not create installations
     * like this, but users may manually symlink construct libraries together or
     * use a monorepo tool: in those cases, multiple copies of the `constructs`
     * library can be accidentally installed, and `instanceof` will behave
     * unpredictably. It is safest to avoid using `instanceof`, and using
     * this type-testing method instead.
     *
     * @returns true if `x` is an object created from a class which extends `Construct`.
     * @param x Any object
     */
    static isConstruct(x) {
        return x && typeof x === 'object' && x[CONSTRUCT_SYM];
    }
    /**
     * Returns a string representation of this construct.
     */
    toString() {
        return this.node.path || '<root>';
    }
}
exports.Construct = Construct;
_b = JSII_RTTI_SYMBOL_1;
Construct[_b] = { fqn: "constructs.Construct", version: "10.1.153" };
/**
 * In what order to return constructs
 */
var ConstructOrder;
(function (ConstructOrder) {
    /**
     * Depth-first, pre-order
     */
    ConstructOrder[ConstructOrder["PREORDER"] = 0] = "PREORDER";
    /**
     * Depth-first, post-order (leaf nodes first)
     */
    ConstructOrder[ConstructOrder["POSTORDER"] = 1] = "POSTORDER";
})(ConstructOrder = exports.ConstructOrder || (exports.ConstructOrder = {}));
const PATH_SEP_REGEX = new RegExp(`${Node.PATH_SEP}`, 'g');
/**
 * Return a sanitized version of an arbitrary string, so it can be used as an ID
 */
function sanitizeId(id) {
    // Escape path seps as double dashes
    return id.replace(PATH_SEP_REGEX, '--');
}
// Mark all instances of 'Construct'
Object.defineProperty(Construct.prototype, CONSTRUCT_SYM, {
    value: true,
    enumerable: false,
    writable: false,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZDQUF1RDtBQUV2RCx1REFBMEQ7QUFDMUQsaURBQStDO0FBRS9DLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQVl6RDs7R0FFRztBQUNILE1BQWEsSUFBSTtJQXVDZixZQUFvQyxJQUFlLEVBQUUsS0FBaUIsRUFBRSxFQUFVO1FBQTlDLFNBQUksR0FBSixJQUFJLENBQVc7UUFUM0MsWUFBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLHdDQUF3QztRQUNoRCxjQUFTLEdBQWlDLEVBQUcsQ0FBQztRQUM5QyxhQUFRLEdBQTJCLEVBQUcsQ0FBQztRQUN2QyxjQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFDdkMsa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO1FBRXZDLGlCQUFZLEdBQUcsSUFBSSxLQUFLLEVBQWUsQ0FBQztRQUl2RCxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLHdDQUF3QztRQUV2RCxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsc0JBQXNCO1FBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQTdDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBcUI7UUFDcEMsT0FBTyxTQUFTLENBQUMsSUFBSSxD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QUE7SUFFUjs7T0FFRztJQUNILDZEQUFTLENBQUE7QUFDWCxDQUFDLEVBVlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFVekI7QUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUUzRDs7R0FFRztBQUNILFNBQVMsVUFBVSxDQUFDLEVBQVU7SUFDNUIsb0NBQW9DO0lBQ3BDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQXNCRCxvQ0FBb0M7QUFDcEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRTtJQUN4RCxLQUFLLEVBQUUsSUFBSTtJQUNYLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlcGVuZGFibGUsIElEZXBlbmRhYmxlIH0gZnJvbSAnLi9kZXBlbmRlbmN5JztcbmltcG9ydCB7IE1ldGFkYXRhRW50cnkgfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7IGNhcHR1cmVTdGFja1RyYWNlIH0gZnJvbSAnLi9wcml2YXRlL3N0YWNrLXRyYWNlJztcbmltcG9ydCB7IGFkZHJlc3NPZiB9IGZyb20gJy4vcHJpdmF0ZS91bmlxdWVpZCc7XG5cbmNvbnN0IENPTlNUUlVDVF9TWU0gPSBTeW1ib2wuZm9yKCdjb25zdHJ1Y3RzLkNvbnN0cnVjdCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb25zdHJ1Y3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbnN0cnVjdCBleHRlbmRzIElEZXBlbmRhYmxlIHtcbiAgLyoqXG4gICAqIFRoZSB0cmVlIG5vZGUuXG4gICAqL1xuICByZWFkb25seSBub2RlOiBOb2RlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGNvbnN0cnVjdCBub2RlIGluIHRoZSBzY29wZSB0cmVlLlxuICovXG5leHBvcnQgY2xhc3MgTm9kZSB7XG4gIC8qKlxuICAgKiBTZXBhcmF0b3IgdXNlZCB0byBkZWxpbWl0IGNvbnN0cnVjdCBwYXRoIGNvbXBvbmVudHMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBBVEhfU0VQID0gJy8nO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBub2RlIGFzc29jaWF0ZWQgd2l0aCBhIGNvbnN0cnVjdC5cbiAgICogQHBhcmFtIGNvbnN0cnVjdCB0aGUgY29uc3RydWN0XG4gICAqXG4gICAqIEBkZXByZWNhdGVkIHVzZSBgY29uc3RydWN0Lm5vZGVgIGluc3RlYWRcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgb2YoY29uc3RydWN0OiBJQ29uc3RydWN0KTogTm9kZSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdC5ub2RlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNjb3BlIGluIHdoaWNoIHRoaXMgY29uc3RydWN0IGlzIGRlZmluZWQuXG4gICAqXG4gICAqIFRoZSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCBhdCB0aGUgcm9vdCBvZiB0aGUgY29uc3RydWN0IHNjb3BlIHRyZWUuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2NvcGU/OiBJQ29uc3RydWN0O1xuXG4gIC8qKlxuICAgKiBUaGUgaWQgb2YgdGhpcyBjb25zdHJ1Y3Qgd2l0aGluIHRoZSBjdXJyZW50IHNjb3BlLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgYSBzY29wZS11bmlxdWUgaWQuIFRvIG9idGFpbiBhbiBhcHAtdW5pcXVlIGlkIGZvciB0aGlzIGNvbnN0cnVjdCwgdXNlIGBhZGRyYC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2xvY2tlZCA9IGZhbHNlOyAvLyBpZiB0aGlzIGlzIFwidHJ1ZVwiLCBhZGRDaGlsZCB3aWxsIGZhaWxcbiAgcHJpdmF0ZSByZWFkb25seSBfY2hpbGRyZW46IHsgW2lkOiBzdHJpbmddOiBJQ29uc3RydWN0IH0gPSB7IH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX2NvbnRleHQ6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7IH07XG4gIHByaXZhdGUgcmVhZG9ubHkgX21ldGFkYXRhID0gbmV3IEFycmF5PE1ldGFkYXRhRW50cnk+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2RlcGVuZGVuY2llcyA9IG5ldyBTZXQ8SURlcGVuZGFibGU+KCk7XG4gIHByaXZhdGUgX2RlZmF1bHRDaGlsZDogSUNvbnN0cnVjdCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSByZWFkb25seSBfdmFsaWRhdGlvbnMgPSBuZXcgQXJyYXk8SVZhbGlkYXRpb24+KCk7XG4gIHByaXZhdGUgX2FkZHI/OiBzdHJpbmc7IC8vIGNhY2hlXG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgaG9zdDogQ29uc3RydWN0LCBzY29wZTogSUNvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIGlkID0gaWQgPz8gJyc7IC8vIGlmIHVuZGVmaW5lZCwgY29udmVydCB0byBlbXB0eSBzdHJpbmdcblxuICAgIHRoaXMuaWQgPSBzYW5pdGl6ZUlkKGlkKTtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG5cbiAgICBpZiAoc2NvcGUgJiYgIXRoaXMuaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT25seSByb290IGNvbnN0cnVjdHMgbWF5IGhhdmUgYW4gZW1wdHkgSUQnKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdG8gcGFyZW50IHNjb3BlXG4gICAgc2NvcGU/Lm5vZGUuYWRkQ2hpbGQoaG9zdCwgdGhpcy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bGwsIGFic29sdXRlIHBhdGggb2YgdGhpcyBjb25zdHJ1Y3QgaW4gdGhlIHRyZWUuXG4gICAqXG4gICAqIENvbXBvbmVudHMgYXJlIHNlcGFyYXRlZCBieSAnLycuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5zY29wZXMuZmlsdGVyKGMgPT4gYy5ub2RlLmlkKS5tYXAoYyA9PiBjLm5vZGUuaWQpO1xuICAgIHJldHVybiBjb21wb25lbnRzLmpvaW4oTm9kZS5QQVRIX1NFUCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvcGFxdWUgdHJlZS11bmlxdWUgYWRkcmVzcyBmb3IgdGhpcyBjb25zdHJ1Y3QuXG4gICAqXG4gICAqIEFkZHJlc3NlcyBhcmUgNDIgY2hhcmFjdGVycyBoZXhhZGVjaW1hbCBzdHJpbmdzLiBUaGV5IGJlZ2luIHdpdGggXCJjOFwiXG4gICAqIGZvbGxvd2VkIGJ5IDQwIGxvd2VyY2FzZSBoZXhhZGVjaW1hbCBjaGFyYWN0ZXJzICgwLTlhLWYpLlxuICAgKlxuICAgKiBBZGRyZXNzZXMgYXJlIGNhbGN1bGF0ZWQgdXNpbmcgYSBTSEEtMSBvZiB0aGUgY29tcG9uZW50cyBvZiB0aGUgY29uc3RydWN0XG4gICAqIHBhdGguXG4gICAqXG4gICAqIFRvIGVuYWJsZSByZWZhY3RvcmluZ3Mgb2YgY29uc3RydWN0IHRyZWVzLCBjb25zdHJ1Y3RzIHdpdGggdGhlIElEIGBEZWZhdWx0YFxuICAgKiB3aWxsIGJlIGV4Y2x1ZGVkIGZyb20gdGhlIGNhbGN1bGF0aW9uLiBJbiB0aG9zZSBjYXNlcyBjb25zdHJ1Y3RzIGluIHRoZVxuICAgKiBzYW1lIHRyZWUgbWF5IGhhdmUgdGhlIHNhbWUgYWRkcmVlc3MuXG4gICAqXG4gICAqIEBleGFtcGxlIGM4M2EyODQ2ZTUwNmJjYzVmMTA2ODJiNTY0MDg0YmNhMmQyNzU3MDllZVxuICAgKi9cbiAgcHVibGljIGdldCBhZGRyKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl9hZGRyKSB7XG4gICAgICB0aGlzLl9hZGRyID0gYWRkcmVzc09mKHRoaXMuc2NvcGVzLm1hcChjID0+IGMubm9kZS5pZCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9hZGRyO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGRpcmVjdCBjaGlsZCBieSBpZCwgb3IgdW5kZWZpbmVkXG4gICAqXG4gICAqIEBwYXJhbSBpZCBJZGVudGlmaWVyIG9mIGRpcmVjdCBjaGlsZFxuICAgKiBAcmV0dXJucyB0aGUgY2hpbGQgaWYgZm91bmQsIG9yIHVuZGVmaW5lZFxuICAgKi9cbiAgcHVibGljIHRyeUZpbmRDaGlsZChpZDogc3RyaW5nKTogSUNvbnN0cnVjdCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuW3Nhbml0aXplSWQoaWQpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBkaXJlY3QgY2hpbGQgYnkgaWRcbiAgICpcbiAgICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjaGlsZCBpcyBub3QgZm91bmQuXG4gICAqXG4gICAqIEBwYXJhbSBpZCBJZGVudGlmaWVyIG9mIGRpcmVjdCBjaGlsZFxuICAgKiBAcmV0dXJucyBDaGlsZCB3aXRoIHRoZSBnaXZlbiBpZC5cbiAgICovXG4gIHB1YmxpYyBmaW5kQ2hpbGQoaWQ6IHN0cmluZyk6IElDb25zdHJ1Y3Qge1xuICAgIGNvbnN0IHJldCA9IHRoaXMudHJ5RmluZENoaWxkKGlkKTtcbiAgICBpZiAoIXJldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBjaGlsZCB3aXRoIGlkOiAnJHtpZH0nYCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2hpbGQgY29uc3RydWN0IHRoYXQgaGFzIHRoZSBpZCBgRGVmYXVsdGAgb3IgYFJlc291cmNlXCJgLlxuICAgKiBUaGlzIGlzIHVzdWFsbHkgdGhlIGNvbnN0cnVjdCB0aGF0IHByb3ZpZGVzIHRoZSBidWxrIG9mIHRoZSB1bmRlcmx5aW5nIGZ1bmN0aW9uYWxpdHkuXG4gICAqIFVzZWZ1bCBmb3IgbW9kaWZpY2F0aW9ucyBvZiB0aGUgdW5kZXJseWluZyBjb25zdHJ1Y3QgdGhhdCBhcmUgbm90IGF2YWlsYWJsZSBhdCB0aGUgaGlnaGVyIGxldmVscy5cbiAgICpcbiAgICogQHRocm93cyBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIGNoaWxkXG4gICAqIEByZXR1cm5zIGEgY29uc3RydWN0IG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBubyBkZWZhdWx0IGNoaWxkXG4gICAqL1xuICBwdWJsaWMgZ2V0IGRlZmF1bHRDaGlsZCgpOiBJQ29uc3RydWN0IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5fZGVmYXVsdENoaWxkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0Q2hpbGQ7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzb3VyY2VDaGlsZCA9IHRoaXMudHJ5RmluZENoaWxkKCdSZXNvdXJjZScpO1xuICAgIGNvbnN0IGRlZmF1bHRDaGlsZCA9IHRoaXMudHJ5RmluZENoaWxkKCdEZWZhdWx0Jyk7XG4gICAgaWYgKHJlc291cmNlQ2hpbGQgJiYgZGVmYXVsdENoaWxkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBkZXRlcm1pbmUgZGVmYXVsdCBjaGlsZCBmb3IgJHt0aGlzLnBhdGh9LiBUaGVyZSBpcyBib3RoIGEgY2hpbGQgd2l0aCBpZCBcIlJlc291cmNlXCIgYW5kIGlkIFwiRGVmYXVsdFwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRDaGlsZCB8fCByZXNvdXJjZUNoaWxkO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlIHRoZSBkZWZhdWx0Q2hpbGQgcHJvcGVydHkuXG4gICAqXG4gICAqIFRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCBpbiB0aGUgY2FzZXMgd2hlcmUgdGhlIGNvcnJlY3RcbiAgICogZGVmYXVsdCBjaGlsZCBpcyBub3QgbmFtZWQgJ1Jlc291cmNlJyBvciAnRGVmYXVsdCcgYXMgaXRcbiAgICogc2hvdWxkIGJlLlxuICAgKlxuICAgKiBJZiB5b3Ugc2V0IHRoaXMgdG8gdW5kZWZpbmVkLCB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiBmaW5kaW5nXG4gICAqIHRoZSBjaGlsZCBuYW1lZCAnUmVzb3VyY2UnIG9yICdEZWZhdWx0JyB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICBwdWJsaWMgc2V0IGRlZmF1bHRDaGlsZCh2YWx1ZTogSUNvbnN0cnVjdCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX2RlZmF1bHRDaGlsZCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFsbCBkaXJlY3QgY2hpbGRyZW4gb2YgdGhpcyBjb25zdHJ1Y3QuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCkge1xuICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuX2NoaWxkcmVuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhpcyBjb25zdHJ1Y3QgYW5kIGFsbCBvZiBpdHMgY2hpbGRyZW4gaW4gdGhlIGdpdmVuIG9yZGVyXG4gICAqL1xuICBwdWJsaWMgZmluZEFsbChvcmRlcjogQ29uc3RydWN0T3JkZXIgPSBDb25zdHJ1Y3RPcmRlci5QUkVPUkRFUik6IElDb25zdHJ1Y3RbXSB7XG4gICAgY29uc3QgcmV0ID0gbmV3IEFycmF5PElDb25zdHJ1Y3Q+KCk7XG4gICAgdmlzaXQodGhpcy5ob3N0KTtcbiAgICByZXR1cm4gcmV0O1xuXG4gICAgZnVuY3Rpb24gdmlzaXQoYzogSUNvbnN0cnVjdCkge1xuICAgICAgaWYgKG9yZGVyID09PSBDb25zdHJ1Y3RPcmRlci5QUkVPUkRFUikge1xuICAgICAgICByZXQucHVzaChjKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBjLm5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdmlzaXQoY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3JkZXIgPT09IENvbnN0cnVjdE9yZGVyLlBPU1RPUkRFUikge1xuICAgICAgICByZXQucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBjYW4gYmUgdXNlZCB0byBzZXQgY29udGV4dHVhbCB2YWx1ZXMuXG4gICAqIENvbnRleHQgbXVzdCBiZSBzZXQgYmVmb3JlIGFueSBjaGlsZHJlbiBhcmUgYWRkZWQsIHNpbmNlIGNoaWxkcmVuIG1heSBjb25zdWx0IGNvbnRleHQgaW5mbyBkdXJpbmcgY29uc3RydWN0aW9uLlxuICAgKiBJZiB0aGUga2V5IGFscmVhZHkgZXhpc3RzLCBpdCB3aWxsIGJlIG92ZXJyaWRkZW4uXG4gICAqIEBwYXJhbSBrZXkgVGhlIGNvbnRleHQga2V5XG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgY29udGV4dCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldENvbnRleHQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBuYW1lcyA9IHRoaXMuY2hpbGRyZW4ubWFwKGMgPT4gYy5ub2RlLmlkKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHNldCBjb250ZXh0IGFmdGVyIGNoaWxkcmVuIGhhdmUgYmVlbiBhZGRlZDogJyArIG5hbWVzLmpvaW4oJywnKSk7XG4gICAgfVxuICAgIHRoaXMuX2NvbnRleHRba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBhIHZhbHVlIGZyb20gdHJlZSBjb250ZXh0LlxuICAgKlxuICAgKiBDb250ZXh0IGlzIHVzdWFsbHkgaW5pdGlhbGl6ZWQgYXQgdGhlIHJvb3QsIGJ1dCBjYW4gYmUgb3ZlcnJpZGRlbiBhdCBhbnkgcG9pbnQgaW4gdGhlIHRyZWUuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgVGhlIGNvbnRleHQga2V5XG4gICAqIEByZXR1cm5zIFRoZSBjb250ZXh0IHZhbHVlIG9yIGB1bmRlZmluZWRgIGlmIHRoZXJlIGlzIG5vIGNvbnRleHQgdmFsdWUgZm9yIHRoaWUga2V5LlxuICAgKi9cbiAgcHVibGljIHRyeUdldENvbnRleHQoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY29udGV4dFtrZXldO1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB2YWx1ZTsgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2NvcGUgJiYgdGhpcy5zY29wZS5ub2RlLnRyeUdldENvbnRleHQoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBpbW11dGFibGUgYXJyYXkgb2YgbWV0YWRhdGEgb2JqZWN0cyBhc3NvY2lhdGVkIHdpdGggdGhpcyBjb25zdHJ1Y3QuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQsIGZvciBleGFtcGxlLCB0byBpbXBsZW1lbnQgc3VwcG9ydCBmb3IgZGVwcmVjYXRpb24gbm90aWNlcywgc291cmNlIG1hcHBpbmcsIGV0Yy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbWV0YWRhdGEoKSB7XG4gICAgcmV0dXJuIFsuLi50aGlzLl9tZXRhZGF0YV07XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1ldGFkYXRhIGVudHJ5IHRvIHRoaXMgY29uc3RydWN0LlxuICAgKiBFbnRyaWVzIGFyZSBhcmJpdHJhcnkgdmFsdWVzIGFuZCB3aWxsIGFsc28gaW5jbHVkZSBhIHN0YWNrIHRyYWNlIHRvIGFsbG93IHRyYWNpbmcgYmFjayB0b1xuICAgKiB0aGUgY29kZSBsb2NhdGlvbiBmb3Igd2hlbiB0aGUgZW50cnkgd2FzIGFkZGVkLiBJdCBjYW4gYmUgdXNlZCwgZm9yIGV4YW1wbGUsIHRvIGluY2x1ZGUgc291cmNlXG4gICAqIG1hcHBpbmcgaW4gQ2xvdWRGb3JtYXRpb24gdGVtcGxhdGVzIHRvIGltcHJvdmUgZGlhZ25vc3RpY3MuXG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIGEgc3RyaW5nIGRlbm90aW5nIHRoZSB0eXBlIG9mIG1ldGFkYXRhXG4gICAqIEBwYXJhbSBkYXRhIHRoZSB2YWx1ZSBvZiB0aGUgbWV0YWRhdGEgKGNhbiBiZSBhIFRva2VuKS4gSWYgbnVsbC91bmRlZmluZWQsIG1ldGFkYXRhIHdpbGwgbm90IGJlIGFkZGVkLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgYWRkTWV0YWRhdGEodHlwZTogc3RyaW5nLCBkYXRhOiBhbnksIG9wdGlvbnM6IE1ldGFkYXRhT3B0aW9ucyA9IHsgfSk6IHZvaWQge1xuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzaG91bGRUcmFjZSA9IG9wdGlvbnMuc3RhY2tUcmFjZSA/PyBmYWxzZTtcbiAgICBjb25zdCB0cmFjZSA9IHNob3VsZFRyYWNlID8gY2FwdHVyZVN0YWNrVHJhY2Uob3B0aW9ucy50cmFjZUZyb21GdW5jdGlvbiA/PyB0aGlzLmFkZE1ldGFkYXRhKSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9tZXRhZGF0YS5wdXNoKHsgdHlwZSwgZGF0YSwgdHJhY2UgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWxsIHBhcmVudCBzY29wZXMgb2YgdGhpcyBjb25zdHJ1Y3QuXG4gICAqXG4gICAqIEByZXR1cm5zIGEgbGlzdCBvZiBwYXJlbnQgc2NvcGVzLiBUaGUgbGFzdCBlbGVtZW50IGluIHRoZSBsaXN0IHdpbGwgYWx3YXlzXG4gICAqIGJlIHRoZSBjdXJyZW50IGNvbnN0cnVjdCBhbmQgdGhlIGZpcnN0IGVsZW1lbnQgd2lsbCBiZSB0aGUgcm9vdCBvZiB0aGVcbiAgICogdHJlZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgc2NvcGVzKCk6IElDb25zdHJ1Y3RbXSB7XG4gICAgY29uc3QgcmV0ID0gbmV3IEFycmF5PElDb25zdHJ1Y3Q+KCk7XG5cbiAgICBsZXQgY3VycjogSUNvbnN0cnVjdCB8IHVuZGVmaW5lZCA9IHRoaXMuaG9zdDtcbiAgICB3aGlsZSAoY3Vycikge1xuICAgICAgcmV0LnVuc2hpZnQoY3Vycik7XG4gICAgICBjdXJyID0gY3Vyci5ub2RlLnNjb3BlO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCBvZiB0aGUgY29uc3RydWN0IHRyZWUuXG4gICAqIEByZXR1cm5zIFRoZSByb290IG9mIHRoZSBjb25zdHJ1Y3QgdHJlZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgcm9vdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zY29wZXNbMF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoaXMgY29uc3RydWN0IG9yIHRoZSBzY29wZXMgaW4gd2hpY2ggaXQgaXMgZGVmaW5lZCBhcmVcbiAgICogbG9ja2VkLlxuICAgKi9cbiAgcHVibGljIGdldCBsb2NrZWQoKSB7XG4gICAgaWYgKHRoaXMuX2xvY2tlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2NvcGUgJiYgdGhpcy5zY29wZS5ub2RlLmxvY2tlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhbiBvcmRlcmluZyBkZXBlbmRlbmN5IG9uIGFub3RoZXIgY29uc3RydWN0LlxuICAgKlxuICAgKiBBbiBgSURlcGVuZGFibGVgXG4gICAqL1xuICBwdWJsaWMgYWRkRGVwZW5kZW5jeSguLi5kZXBzOiBJRGVwZW5kYWJsZVtdKSB7XG4gICAgZm9yIChjb25zdCBkIG9mIGRlcHMpIHtcbiAgICAgIHRoaXMuX2RlcGVuZGVuY2llcy5hZGQoZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhbGwgZGVwZW5kZW5jaWVzIHJlZ2lzdGVyZWQgb24gdGhpcyBub2RlIChub24tcmVjdXJzaXZlKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgZGVwZW5kZW5jaWVzKCk6IElDb25zdHJ1Y3RbXSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5PElDb25zdHJ1Y3Q+KCk7XG4gICAgZm9yIChjb25zdCBkZXAgb2YgdGhpcy5fZGVwZW5kZW5jaWVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHJvb3Qgb2YgRGVwZW5kYWJsZS5vZihkZXApLmRlcGVuZGVuY3lSb290cykge1xuICAgICAgICByZXN1bHQucHVzaChyb290KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0aGUgY2hpbGQgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgaWYgcHJlc2VudC5cbiAgICpcbiAgICogQHJldHVybnMgV2hldGhlciBhIGNoaWxkIHdpdGggdGhlIGdpdmVuIG5hbWUgd2FzIGRlbGV0ZWQuXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIHB1YmxpYyB0cnlSZW1vdmVDaGlsZChjaGlsZE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghKGNoaWxkTmFtZSBpbiB0aGlzLl9jaGlsZHJlbikpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgZGVsZXRlIHRoaXMuX2NoaWxkcmVuW2NoaWxkTmFtZV07XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHZhbGlkYXRpb24gdG8gdGhpcyBjb25zdHJ1Y3QuXG4gICAqXG4gICAqIFdoZW4gYG5vZGUudmFsaWRhdGUoKWAgaXMgY2FsbGVkLCB0aGUgYHZhbGlkYXRlKClgIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBvblxuICAgKiBhbGwgdmFsaWRhdGlvbnMgYW5kIGFsbCBlcnJvcnMgd2lsbCBiZSByZXR1cm5lZC5cbiAgICpcbiAgICogQHBhcmFtIHZhbGlkYXRpb24gVGhlIHZhbGlkYXRpb24gb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgYWRkVmFsaWRhdGlvbih2YWxpZGF0aW9uOiBJVmFsaWRhdGlvbikge1xuICAgIHRoaXMuX3ZhbGlkYXRpb25zLnB1c2godmFsaWRhdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGVzIHRoaXMgY29uc3RydWN0LlxuICAgKlxuICAgKiBJbnZva2VzIHRoZSBgdmFsaWRhdGUoKWAgbWV0aG9kIG9uIGFsbCB2YWxpZGF0aW9ucyBhZGRlZCB0aHJvdWdoXG4gICAqIGBhZGRWYWxpZGF0aW9uKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyBhbiBhcnJheSBvZiB2YWxpZGF0aW9uIGVycm9yIG1lc3NhZ2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzXG4gICAqIGNvbnN0cnVjdC5cbiAgICovXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZGVwcmVjYXRlZCA9IFsndmFsaWRhdGUnLCAnb25WYWxpZGF0ZScsICdzeW50aGVzaXplJywgJ29uU3ludGhlc2l6ZScsICdwcmVwYXJlJywgJ29uUHJlcGFyZSddO1xuICAgIGZvciAoY29uc3QgbWV0aG9kIG9mIGRlcHJlY2F0ZWQpIHtcbiAgICAgIGlmICh0eXBlb2YoKHRoaXMuaG9zdCBhcyBhbnkpW21ldGhvZF0pID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgdGhlIGNvbnN0cnVjdCBcIiR7dGhpcy5wYXRofVwiIGhhcyBhIFwiJHttZXRob2R9KClcIiBtZXRob2Qgd2hpY2ggaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC4gVXNlIFwiY29uc3RydWN0Lm5vZGUuYWRkVmFsaWRhdGlvbigpXCIgdG8gYWRkIHZhbGlkYXRpb25zIHRvIGEgY29uc3RydWN0YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZXJyb3JzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IHYgb2YgdGhpcy5fdmFsaWRhdGlvbnMpIHtcbiAgICAgIGVycm9ycy5wdXNoKC4uLnYudmFsaWRhdGUoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9ycztcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2NrcyB0aGlzIGNvbnN0cnVjdCBmcm9tIGFsbG93aW5nIG1vcmUgY2hpbGRyZW4gdG8gYmUgYWRkZWQuIEFmdGVyIHRoaXNcbiAgICogY2FsbCwgbm8gbW9yZSBjaGlsZHJlbiBjYW4gYmUgYWRkZWQgdG8gdGhpcyBjb25zdHJ1Y3Qgb3IgdG8gYW55IGNoaWxkcmVuLlxuICAgKi9cbiAgcHVibGljIGxvY2soKSB7XG4gICAgdGhpcy5fbG9ja2VkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hpbGQgY29uc3RydWN0IHRvIHRoaXMgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIGNoaWxkIFRoZSBjaGlsZCBjb25zdHJ1Y3RcbiAgICogQHBhcmFtIGNoaWxkTmFtZSBUaGUgdHlwZSBuYW1lIG9mIHRoZSBjaGlsZCBjb25zdHJ1Y3QuXG4gICAqIEByZXR1cm5zIFRoZSByZXNvbHZlZCBwYXRoIHBhcnQgbmFtZSBvZiB0aGUgY2hpbGRcbiAgICovXG4gIHByaXZhdGUgYWRkQ2hpbGQoY2hpbGQ6IENvbnN0cnVjdCwgY2hpbGROYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5sb2NrZWQpIHtcblxuICAgICAgLy8gc3BlY2lhbCBlcnJvciBpZiByb290IGlzIGxvY2tlZFxuICAgICAgaWYgKCF0aGlzLnBhdGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWRkIGNoaWxkcmVuIGR1cmluZyBzeW50aGVzaXMnKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgYWRkIGNoaWxkcmVuIHRvIFwiJHt0aGlzLnBhdGh9XCIgZHVyaW5nIHN5bnRoZXNpc2ApO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5hbWUgaW4gdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmlkID8/ICcnO1xuICAgICAgY29uc3QgdHlwZU5hbWUgPSB0aGlzLmhvc3QuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlcmUgaXMgYWxyZWFkeSBhIENvbnN0cnVjdCB3aXRoIG5hbWUgJyR7Y2hpbGROYW1lfScgaW4gJHt0eXBlTmFtZX0ke25hbWUubGVuZ3RoID4gMCA/ICcgWycgKyBuYW1lICsgJ10nIDogJyd9YCk7XG4gICAgfVxuXG4gICAgaWYgKCFjaGlsZE5hbWUgJiYgdGhpcy5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW5ub3QgYWRkIGEgbmFtZWxlc3MgY29uc3RydWN0IHRvIHRoZSBuYW1lZCBzY29wZTogJHt0aGlzLnBhdGh9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hpbGRyZW5bY2hpbGROYW1lXSA9IGNoaWxkO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKS5sZW5ndGggPiAxICYmIE9iamVjdC5rZXlzKHRoaXMuX2NoaWxkcmVuKS5maWx0ZXIoeCA9PiAheCkubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbmx5IGEgc2luZ2xlIGNvbnN0cnVjdCBpcyBhbGxvd2VkIGluIGEgc2NvcGUgaWYgaXQgaGFzIGFuIGVtcHR5IG5hbWUnKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBidWlsZGluZyBibG9jayBvZiB0aGUgY29uc3RydWN0IGdyYXBoLlxuICpcbiAqIEFsbCBjb25zdHJ1Y3RzIGJlc2lkZXMgdGhlIHJvb3QgY29uc3RydWN0IG11c3QgYmUgY3JlYXRlZCB3aXRoaW4gdGhlIHNjb3BlIG9mXG4gKiBhbm90aGVyIGNvbnN0cnVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnN0cnVjdCBpbXBsZW1lbnRzIElDb25zdHJ1Y3Qge1xuICAvKipcbiAgICogQ2hlY2tzIGlmIGB4YCBpcyBhIGNvbnN0cnVjdC5cbiAgICpcbiAgICogVXNlIHRoaXMgbWV0aG9kIGluc3RlYWQgb2YgYGluc3RhbmNlb2ZgIHRvIHByb3Blcmx5IGRldGVjdCBgQ29uc3RydWN0YFxuICAgKiBpbnN0YW5jZXMsIGV2ZW4gd2hlbiB0aGUgY29uc3RydWN0IGxpYnJhcnkgaXMgc3ltbGlua2VkLlxuICAgKlxuICAgKiBFeHBsYW5hdGlvbjogaW4gSmF2YVNjcmlwdCwgbXVsdGlwbGUgY29waWVzIG9mIHRoZSBgY29uc3RydWN0c2AgbGlicmFyeSBvblxuICAgKiBkaXNrIGFyZSBzZWVuIGFzIGluZGVwZW5kZW50LCBjb21wbGV0ZWx5IGRpZmZlcmVudCBsaWJyYXJpZXMuIEFzIGFcbiAgICogY29uc2VxdWVuY2UsIHRoZSBjbGFzcyBgQ29uc3RydWN0YCBpbiBlYWNoIGNvcHkgb2YgdGhlIGBjb25zdHJ1Y3RzYCBsaWJyYXJ5XG4gICAqIGlzIHNlZW4gYXMgYSBkaWZmZXJlbnQgY2xhc3MsIGFuZCBhbiBpbnN0YW5jZSBvZiBvbmUgY2xhc3Mgd2lsbCBub3QgdGVzdCBhc1xuICAgKiBgaW5zdGFuY2VvZmAgdGhlIG90aGVyIGNsYXNzLiBgbnBtIGluc3RhbGxgIHdpbGwgbm90IGNyZWF0ZSBpbnN0YWxsYXRpb25zXG4gICAqIGxpa2UgdGhpcywgYnV0IHVzZXJzIG1heSBtYW51YWxseSBzeW1saW5rIGNvbnN0cnVjdCBsaWJyYXJpZXMgdG9nZXRoZXIgb3JcbiAgICogdXNlIGEgbW9ub3JlcG8gdG9vbDogaW4gdGhvc2UgY2FzZXMsIG11bHRpcGxlIGNvcGllcyBvZiB0aGUgYGNvbnN0cnVjdHNgXG4gICAqIGxpYnJhcnkgY2FuIGJlIGFjY2lkZW50YWxseSBpbnN0YWxsZWQsIGFuZCBgaW5zdGFuY2VvZmAgd2lsbCBiZWhhdmVcbiAgICogdW5wcmVkaWN0YWJseS4gSXQgaXMgc2FmZXN0IHRvIGF2b2lkIHVzaW5nIGBpbnN0YW5jZW9mYCwgYW5kIHVzaW5nXG4gICAqIHRoaXMgdHlwZS10ZXN0aW5nIG1ldGhvZCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGB4YCBpcyBhbiBvYmplY3QgY3JlYXRlZCBmcm9tIGEgY2xhc3Mgd2hpY2ggZXh0ZW5kcyBgQ29uc3RydWN0YC5cbiAgICogQHBhcmFtIHggQW55IG9iamVjdFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc0NvbnN0cnVjdCh4OiBhbnkpOiB4IGlzIENvbnN0cnVjdCB7XG4gICAgcmV0dXJuIHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHhbQ09OU1RSVUNUX1NZTV07XG4gIH1cblxuICAvKipcbiAgICogVGhlIHRyZWUgbm9kZS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBub2RlOiBOb2RlO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbnN0cnVjdCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0gc2NvcGUgVGhlIHNjb3BlIGluIHdoaWNoIHRvIGRlZmluZSB0aGlzIGNvbnN0cnVjdFxuICAgKiBAcGFyYW0gaWQgVGhlIHNjb3BlZCBjb25zdHJ1Y3QgSUQuIE11c3QgYmUgdW5pcXVlIGFtb25nc3Qgc2libGluZ3MuIElmXG4gICAqIHRoZSBJRCBpbmNsdWRlcyBhIHBhdGggc2VwYXJhdG9yIChgL2ApLCB0aGVuIGl0IHdpbGwgYmUgcmVwbGFjZWQgYnkgZG91YmxlXG4gICAqIGRhc2ggYC0tYC5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLm5vZGUgPSBuZXcgTm9kZSh0aGlzLCBzY29wZSwgaWQpO1xuXG4gICAgLy8gaW1wbGVtZW50IElEZXBlbmRhYmxlIHByaXZhdGVseVxuICAgIERlcGVuZGFibGUuaW1wbGVtZW50KHRoaXMsIHtcbiAgICAgIGRlcGVuZGVuY3lSb290czogW3RoaXNdLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBjb25zdHJ1Y3QuXG4gICAqL1xuICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5wYXRoIHx8ICc8cm9vdD4nO1xuICB9XG59XG5cbi8qKlxuICogSW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIGluIG9yZGVyIGZvciB0aGUgY29uc3RydWN0IHRvIGJlIGFibGUgdG8gdmFsaWRhdGUgaXRzZWxmLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uIHtcbiAgLyoqXG4gICAqIFZhbGlkYXRlIHRoZSBjdXJyZW50IGNvbnN0cnVjdC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgY2FuIGJlIGltcGxlbWVudGVkIGJ5IGRlcml2ZWQgY29uc3RydWN0cyBpbiBvcmRlciB0byBwZXJmb3JtXG4gICAqIHZhbGlkYXRpb24gbG9naWMuIEl0IGlzIGNhbGxlZCBvbiBhbGwgY29uc3RydWN0cyBiZWZvcmUgc3ludGhlc2lzLlxuICAgKlxuICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB2YWxpZGF0aW9uIGVycm9yIG1lc3NhZ2VzLCBvciBhbiBlbXB0eSBhcnJheSBpZiB0aGVyZSB0aGUgY29uc3RydWN0IGlzIHZhbGlkLlxuICAgKi9cbiAgdmFsaWRhdGUoKTogc3RyaW5nW107XG59XG5cbi8qKlxuICogSW4gd2hhdCBvcmRlciB0byByZXR1cm4gY29uc3RydWN0c1xuICovXG5leHBvcnQgZW51bSBDb25zdHJ1Y3RPcmRlciB7XG4gIC8qKlxuICAgKiBEZXB0aC1maXJzdCwgcHJlLW9yZGVyXG4gICAqL1xuICBQUkVPUkRFUixcblxuICAvKipcbiAgICogRGVwdGgtZmlyc3QsIHBvc3Qtb3JkZXIgKGxlYWYgbm9kZXMgZmlyc3QpXG4gICAqL1xuICBQT1NUT1JERVJcbn1cblxuY29uc3QgUEFUSF9TRVBfUkVHRVggPSBuZXcgUmVnRXhwKGAke05vZGUuUEFUSF9TRVB9YCwgJ2cnKTtcblxuLyoqXG4gKiBSZXR1cm4gYSBzYW5pdGl6ZWQgdmVyc2lvbiBvZiBhbiBhcmJpdHJhcnkgc3RyaW5nLCBzbyBpdCBjYW4gYmUgdXNlZCBhcyBhbiBJRFxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZUlkKGlkOiBzdHJpbmcpIHtcbiAgLy8gRXNjYXBlIHBhdGggc2VwcyBhcyBkb3VibGUgZGFzaGVzXG4gIHJldHVybiBpZC5yZXBsYWNlKFBBVEhfU0VQX1JFR0VYLCAnLS0nKTtcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBgY29uc3RydWN0LmFkZE1ldGFkYXRhKClgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBJbmNsdWRlIHN0YWNrIHRyYWNlIHdpdGggbWV0YWRhdGEgZW50cnkuXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICByZWFkb25seSBzdGFja1RyYWNlPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBKYXZhU2NyaXB0IGZ1bmN0aW9uIHRvIGJlZ2luIHRyYWNpbmcgZnJvbS5cbiAgICpcbiAgICogVGhpcyBvcHRpb24gaXMgaWdub3JlZCB1bmxlc3MgYHN0YWNrVHJhY2VgIGlzIGB0cnVlYC5cbiAgICpcbiAgICogQGRlZmF1bHQgYWRkTWV0YWRhdGEoKVxuICAgKi9cbiAgcmVhZG9ubHkgdHJhY2VGcm9tRnVuY3Rpb24/OiBhbnk7XG59XG5cbi8vIE1hcmsgYWxsIGluc3RhbmNlcyBvZiAnQ29uc3RydWN0J1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdC5wcm90b3R5cGUsIENPTlNUUlVDVF9TWU0sIHtcbiAgdmFsdWU6IHRydWUsXG4gIGVudW1lcmFibGU6IGZhbHNlLFxuICB3cml0YWJsZTogZmFsc2UsXG59KTtcbiJdfQ==