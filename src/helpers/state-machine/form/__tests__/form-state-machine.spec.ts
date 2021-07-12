// Import
import createFormFieldStates from '..';

describe('Form State Machine', () => {
    it('Should be able to get states', () => {
        const fieldStates = createFormFieldStates({ schema: {} });
        const expected = "{\"id\":\"formMachine\",\"initial\":\"clean\",\"type\":\"parallel\",\"states\":{\"formUI\":{\"initial\":\"clean\",\"states\":{\"clean\":{\"on\":{\"moveItemUp\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"moveItemDown\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"deleteItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"removeProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"updateNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"update\":[{\"target\":\"dirty\",\"actions\":[\"updateData\"]},{\"target\":\"invalid\",\"actions\":[\"updateData\",\"updateErrorData\"]}],\"updateFormOnXHRComplete\":{\"target\":\"dirty\",\"actions\":[\"updateXHRData\"]},\"updateXHRProgress\":{\"target\":\"loading\",\"actions\":[\"updateXHRProgress\"]},\"errorXHRProgress\":{\"target\":\"invalid\",\"actions\":[\"updateErrorXHRProgress\"]},\"error\":{\"target\":\"invalid\",\"actions\":[\"updateErrorData\"]},\"noErrors\":{\"target\":\"dirty\",\"actions\":[\"updateErrorData\"]},\"stepChange\":{\"target\":\"dirty\",\"actions\":[\"updateActiveStep\"]},\"updateTabIndex\":{\"target\":\"dirty\",\"actions\":[\"updateTabIndex\"]},\"submit\":{\"target\":\"submitted\"}}},\"loading\":{\"on\":{\"moveItemUp\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"moveItemDown\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"deleteItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"removeProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"updateNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"update\":[{\"target\":\"dirty\",\"actions\":[\"updateData\"]},{\"target\":\"invalid\",\"actions\":[\"updateData\",\"updateErrorData\"]}],\"updateFormOnXHRComplete\":{\"target\":\"dirty\",\"actions\":[\"updateXHRData\"]},\"updateXHRProgress\":{\"target\":\"loading\",\"actions\":[\"updateXHRProgress\"]},\"errorXHRProgress\":{\"target\":\"invalid\",\"actions\":[\"updateErrorXHRProgress\"]},\"error\":{\"target\":\"invalid\",\"actions\":[\"updateErrorData\"]},\"noErrors\":{\"target\":\"dirty\",\"actions\":[\"updateErrorData\"]},\"stepChange\":{\"target\":\"dirty\",\"actions\":[\"updateActiveStep\"]},\"updateTabIndex\":{\"target\":\"dirty\",\"actions\":[\"updateTabIndex\"]},\"submit\":{\"target\":\"submitted\"}}},\"invalid\":{\"on\":{\"moveItemUp\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"moveItemDown\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"deleteItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"removeProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"updateNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"update\":[{\"target\":\"dirty\",\"actions\":[\"updateData\"]},{\"target\":\"invalid\",\"actions\":[\"updateData\",\"updateErrorData\"]}],\"updateFormOnXHRComplete\":{\"target\":\"dirty\",\"actions\":[\"updateXHRData\"]},\"updateXHRProgress\":{\"target\":\"loading\",\"actions\":[\"updateXHRProgress\"]},\"errorXHRProgress\":{\"target\":\"invalid\",\"actions\":[\"updateErrorXHRProgress\"]},\"error\":{\"target\":\"invalid\",\"actions\":[\"updateErrorData\"]},\"noErrors\":{\"target\":\"dirty\",\"actions\":[\"updateErrorData\"]},\"stepChange\":{\"target\":\"dirty\",\"actions\":[\"updateActiveStep\"]},\"updateTabIndex\":{\"target\":\"dirty\",\"actions\":[\"updateTabIndex\"]}}},\"dirty\":{\"on\":{\"moveItemUp\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"moveItemDown\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"deleteItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addItem\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"addNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"removeProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"updateNewProperty\":{\"target\":\"dirty\",\"actions\":[\"updateArrayData\"]},\"update\":[{\"target\":\"dirty\",\"actions\":[\"updateData\"]},{\"target\":\"invalid\",\"actions\":[\"updateData\",\"updateErrorData\"]}],\"updateFormOnXHRComplete\":{\"target\":\"dirty\",\"actions\":[\"updateXHRData\"]},\"updateXHRProgress\":{\"target\":\"loading\",\"actions\":[\"updateXHRProgress\"]},\"errorXHRProgress\":{\"target\":\"invalid\",\"actions\":[\"updateErrorXHRProgress\"]},\"error\":{\"target\":\"invalid\",\"actions\":[\"updateErrorData\"]},\"noErrors\":{\"target\":\"dirty\",\"actions\":[\"updateErrorData\"]},\"stepChange\":{\"target\":\"dirty\",\"actions\":[\"updateActiveStep\"]},\"updateTabIndex\":{\"target\":\"dirty\",\"actions\":[\"updateTabIndex\"]},\"submit\":{\"target\":\"submitted\"}}},\"disabled\":{\"type\":\"final\"},\"submitted\":{\"type\":\"final\"}}}}}";
        expect(JSON.stringify(fieldStates)).toBe(expected);
    });
});