[![Build Status](https://travis-ci.org/lexich/redux-controller.svg)](https://travis-ci.org/lexich/redux-controller)
[![NPM version](https://badge.fury.io/js/redux-controller.svg)](http://badge.fury.io/js/redux-controller)
[![Coverage Status](https://coveralls.io/repos/lexich/redux-controller/badge.png?branch=master)](https://coveralls.io/r/lexich/redux-controller?branch=master)

### About redux-controller
redux-controller helps to generate controllers (functions) with access to (dispatch and getState) redux functionality without binding to React components.

### Example

```javascript
// controller.js
import reduxController from "redux-controller";
const ctrl = reduxController();
import { getItem } from "../actions/item";
import { addItem } from "../actions/list";

ctrl.create("addItem", function(dispatch, getState) {
  return function(id) {
    dispatch(getItem(id));
    const { item } = getState();
    dispatch(addItem(item));
  }
});

export default ctrl;

// app.js
import controller from "./controller";
const store = (....); // redux store initialization
controller.use(store);
// ....

// SmartComponent.jsx
import { connect } from "react-redux";
import controller from "./controller";

class SmartComponent extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };
  render() {
    const { addItem } = this.props;
    return <button class="SmartComponent" onClick={ addItem }></button>
  }
}
function mapToFunc() {
  return { addItem: controller.get("addItem") };
}
export default connect(null, )

```
