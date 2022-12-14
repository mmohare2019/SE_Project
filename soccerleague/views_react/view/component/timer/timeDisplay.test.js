import "react";
import "react-native";
import Time from "./timeDisplay";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing time display", function () {
    const component = renderer
    .create(<Time setFunction={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 
