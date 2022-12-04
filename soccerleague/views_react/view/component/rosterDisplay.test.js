import "react-native";
import "react";
import RosterDisplay from "./rosterDisplay";
import { test, expect } from "@jest/globals";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test("Testing team display field", function () {
    const component = renderer
    .create(<RosterDisplay onPress={()=>1}/>).toJSON();
    expect(component).toMatchSnapshot();
}); 