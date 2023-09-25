import {Cache} from "../src/cache";


test('can set and get not-empty key,value,hit', () => {
    const c = new Cache()
    const result = c.setValue("validKey",123,10)
    expect(result).toBe(true);
    expect(c.getValue("validKey")).toBe(123);
});

test('can set and get not-empty key,value and null hit', () => {
    const c = new Cache()
    const result = c.setValue("validKey",1)
    expect(result).toBe(true);
    expect(c.getValue("validKey")).toBe(1);
});

test('can not set value with empty-string key', () => {
    const c = new Cache()
    const result = c.setValue("",1)
    expect(result).toBe(false);
});

test('can not set value with array key', () => {
    const c = new Cache()
    const result = c.setValue([1,2,3,4],1)
    expect(result).toBe(false);
});

test('can not set value with  dict-key', () => {
    const c = new Cache()
    const result = c.setValue({"key":"value1"},1)
    expect(result).toBe(false);
});


test('can not set value with negative hit', () => {
    const c = new Cache()
    const result = c.setValue("validKey","value",-100)
    expect(result).toBe(false);
});

test('can not set value with zero hit', () => {
    const c = new Cache()
    const result = c.setValue("validKey","value",0)
    expect(result).toBe(false);
});

test('can set and get string value', () => {
    const c = new Cache()
    const result = c.setValue("validKey","string")
    expect(result).toBe(true);
    expect(c.getValue("validKey")).toBe("string");
});

test('can set and get array value', () => {
    const c = new Cache()
    const result = c.setValue("validKey",[1,2,3,4,5])
    expect(result).toBe(true);
    expect(c.getValue("validKey")).toStrictEqual([1,2,3,4,5]);
});

test('can set and get dict value', () => {
    const c = new Cache()
    const result = c.setValue("validKey",{"key1":"value1","key2":"value2"})
    expect(result).toBe(true);
    expect(c.getValue("validKey")).toStrictEqual({"key1":"value1","key2":"value2"});
});


test('can set and get value with integer key', () => {
    const c = new Cache()
    const result = c.setValue(123,"123")
    expect(result).toBe(true);
    expect(c.getValue(123)).toBe("123");
});


test('can set and get value with negative numeric key', () => {
    const c = new Cache()
    const result = c.setValue(123.456,"123")
    expect(result).toBe(true);
    expect(c.getValue(123.456)).toBe("123");
});

test('return null if key is not present in Cache', () => {
    const c = new Cache()
    expect(c.getValue(123)).toBe(null);
});

test('getStatByKey returns actual stats for key', () => {
    const c = new Cache()
    const result = c.setValue(123,"123",1203)
    expect(result).toBe(true);
    expect(c.getStatByKey(123)).toStrictEqual({"key":123,"value":"123","hit remains":1203});
});

test('every getValue dicreases hit number', () => {
    const c = new Cache()
    const result = c.setValue(123,"123",2)
    expect(result).toBe(true);
    expect(c.getValue(123)).toBe("123");
    expect(c.getStatByKey(123)).toStrictEqual({"key":123,"value":"123","hit remains":1});
});

test('return null if hit is zero', () => {
    const c = new Cache()
    const result = c.setValue(123,"123")
    expect(result).toBe(true);
    expect(c.getValue(123)).toBe("123");
    expect(c.getValue(123)).toBe(null);
});

test('getStats returns actual info', () => {
    const c = new Cache()
    c.setValue(123,"123",3)
    c.setValue(1,1,100)
    c.setValue(34.22,133.11,2)
    c.setValue("string","hello",20)
    expect(c.getStats()).toStrictEqual(
        [
            {"key":123,"value":"123","hit remains":3},
            {"key":1,"value":1,"hit remains":100},
            {"key":34.22,"value":133.11,"hit remains":2},
            {"key":"string","value":"hello","hit remains":20}
        ]);
});

test('Can not get stats from non-existing key', () => {
    const c = new Cache()
    expect(c.getStatByKey("non-existing")).toBe(
        null);
});

test('if hit is zero , record presented in Stats', () => {
    const c = new Cache()
    c.setValue(123,"123")
    c.setValue(1,1)
    expect(c.getValue(1)).toBe(1);
    expect(c.getStats()).toStrictEqual(
        [
        {"key":123,"value":"123","hit remains":1},
        {"key":1,"value":null,"hit remains":0}
    ]);
});

