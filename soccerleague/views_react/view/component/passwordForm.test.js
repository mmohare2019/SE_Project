import "react-native";
import "react";
import PasswordFormField from "./passwordForm";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing form field", function () {
    const component = renderer
    .create(<PasswordFormField setFunction={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 