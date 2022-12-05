import "react-native";
import "react";
import PlayerDisplay from "./playerDisplay";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing team display field", function () {
    const component = renderer
    .create(<PlayerDisplay onPress={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 