import each_property_pair from './object_iteration';
import { expect } from 'chai';

describe('iterating object properties', function() {
  function First() {
    this.age = 23;
  }

  function Second() {
    this.name = 'JP';
  }

  Second.prototype = new First();

  beforeEach(function() {
    this.first = new First();
    this.second = new Second();
  });

  describe('when including attributes from prototype hierarchy', function() {
    beforeEach(function() {
      this.attributes = [];
    });

    beforeEach(function() {
      var values = this.attributes;

      each_property_pair(
        this.second,
        function(name, value) {
          values.push(name);
        },
        true
      );
    });

    it('iterates all of the attributes in the hierarchy', function() {
      expect(this.attributes.indexOf('name') > -1).to.be.true;
      expect(this.attributes.indexOf('age') > -1).to.be.true;
    });
  });

  describe('when skipping attributes from prototype hierarchy', function() {
    beforeEach(function() {
      this.attributes = [];
      this.second.own_value = 20;
    });

    beforeEach(function() {
      var values = this.attributes;

      each_property_pair(
        this.second,
        function(name, value, own_property) {
          values.push(name);
        },
        false
      );
    });

    it('iterates only the attributes at the objects root not including ancestors', function() {
      expect(this.attributes.indexOf('age')).to.eql(-1);
      expect(this.attributes.indexOf('name') > -1).to.be.true;
      expect(this.attributes.indexOf('own_value') > -1).to.be.true;
    });
  });
});
