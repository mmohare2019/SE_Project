import "react-native";
import "react";
import FormField from "./button";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing form field", function () {
    const component = renderer
    .create(<FormField onPress={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 