import "react-native";
import "react";
import Header from "./button";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing header component", function () {
    const component = renderer
    .create(<Header label={"Hello world"} />).toJSON();
    expect(component).toMatchSnapshot();
}); 