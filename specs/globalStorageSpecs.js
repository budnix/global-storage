
describe('GlobalStorage:set/get', function  () {
    it('should set/get a key-value pairs (number)', function () {
        GlobalStorage.set('test', 123);

        expect(GlobalStorage.get('test')).toEqual(123);
    });
    it('should set/get a key-value pairs (number float)', function () {
        GlobalStorage.set('test', 123.321);

        expect(GlobalStorage.get('test')).toEqual(123.321);
    });
    it('should set/get a key-value pairs (array)', function () {
        GlobalStorage.set('test', [1, 'a', {foo: 'bar'}]);

        expect(GlobalStorage.get('test')).toEqual([1, 'a', {foo: 'bar'}]);
        expect(GlobalStorage.get('test.0')).toEqual(null);
        expect(GlobalStorage.get('test.1')).toEqual(null);
        expect(GlobalStorage.get('test.2.foo')).toEqual(null);
    });
    it('should set/get a key-value pairs (string)', function () {
        GlobalStorage.set('test_string', 'some test');

        expect(GlobalStorage.get('test_string')).toEqual('some test');

        GlobalStorage.set('test_string_multi_line', 'some test \n\n\n\n end');

        expect(GlobalStorage.get('test_string_multi_line')).toEqual('some test \n\n\n\n end');
    });
    it('should set/get a key-value pairs (object deep level: one)', function () {
        var object = {
            some: 'key',
            foo: 'bar',
            number: 33,
            my_array: [1, 2, 'a']
        };
        GlobalStorage.set('test', object);

        expect(GlobalStorage.get('test')).toEqual(object);
        expect(GlobalStorage.get('test.some')).toEqual('key');
        expect(GlobalStorage.get('test.foo')).toEqual('bar');
        expect(GlobalStorage.get('test.number')).toEqual(33);
        expect(GlobalStorage.get('test.my_array')).toEqual([1, 2, 'a']);
        expect(GlobalStorage.get('test.my_array.0')).toEqual(null);
    });
    it('should set/get a key-value pairs (object deep level: multi)', function () {
        var object = {
            foo: {
                bar: {
                    test: 'my value',
                    my_array: [1, 2, 'a', 'b', {foo: 'bar'}]
                }
            }
        };
        GlobalStorage.set('test', object);

        expect(GlobalStorage.get('test')).toEqual(object);
        expect(GlobalStorage.get('test.foo')).toEqual(object.foo);
        expect(GlobalStorage.get('test.foo.bar')).toEqual(object.foo.bar);
        expect(GlobalStorage.get('test.foo.bar.test')).toEqual('my value');
        expect(GlobalStorage.get('test.foo.bar.my_array')).toEqual([1, 2, 'a', 'b', {foo: 'bar'}]);
        expect(GlobalStorage.get('test.foo.bar.my_array.0')).toEqual(null);
        expect(GlobalStorage.get('test.foo.bar.my_array.4.foo')).toEqual(null);
    });
});

describe('GlobalStorage:get', function  () {
    it('should return null when value not exists', function () {
        expect(GlobalStorage.get('not-exist')).toEqual(null);
    });
    it('should return default value', function () {
        expect(GlobalStorage.get('not-exist', 'default')).toEqual('default');
        expect(GlobalStorage.get('not-exist', 123)).toEqual(123);
        expect(GlobalStorage.get('not-exist', {foo: 'bar'})).toEqual({foo: 'bar'});
    });
});

describe('GlobalStorage:fromJSON', function  () {
    it('should init storage data from JSON string', function () {
        GlobalStorage.fromJSON('{"foo":"bar","number":1,"array":[1,2],"object":{"test":{}}}');

        expect(GlobalStorage.get('foo')).toEqual('bar');
        expect(GlobalStorage.get('number')).toEqual(1);
        expect(GlobalStorage.get('array')).toEqual([1, 2]);
        expect(GlobalStorage.get('object')).toEqual({test: {}});
        expect(GlobalStorage.get('object.test')).toEqual({});
    });
});