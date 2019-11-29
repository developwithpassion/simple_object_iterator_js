export default (object, callback, include_prototype_hierarchy_attributes = false) => {
  for (let method_name in object) {
    const value = object[method_name];
    const is_own_property = object.hasOwnProperty(method_name);

    if (is_own_property || include_prototype_hierarchy_attributes)
      callback(method_name, value, is_own_property);
  }
};
