import "react-native";
import "react";
import CustomButton from "./button";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("custom button", function () {
    const component = renderer
    .create(<CustomButton text={"Hello world"} onPress={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 