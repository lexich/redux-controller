"use strict"
module.exports = function() {
  var listOfControllers = {}, cache = {};
  var store;

  function use(_store) {
    store = _store;
  }

  function create(name, creator) {
    if (!name) {
      throw new Error("name argument isn't define");
    }
    if (listOfControllers[name]) {
      throw new Error("argument name=" + name + " has been already used");
    }

    if (!(creator instanceof Function)) {
      throw new Error("creator isn't function");
    }
    listOfControllers[name] = creator;
    return name;
  }

  function remove(name) {
    var ptr = listOfControllers[name];
    listOfControllers[name] = (void 0);
    cache[name] = (void 0);
    return !ptr;
  }

  function get(name) {
    if (!store) {
      throw new Error("store isn't define you should call `use` method");
    }
    if (!listOfControllers[name])  {
      throw new Error("controller " + name + " wasn't defined");
    }
    var ref = cache[name] || (
      cache[name] = listOfControllers[name](store.dispatch, store.getState, cache)
    );
    return ref;
  }

  return {
    use: use,
    create: create,
    remove: remove,
    get: get
  };
};
