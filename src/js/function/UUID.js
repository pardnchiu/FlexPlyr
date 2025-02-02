let uuid_map = new $Map();

function UUID(length = 32) {
    const len = keyString[_length];
    let result = "";

    do {
        result = $Array[_from]({ length }, _ => keyString[_charAt]($Math[_floor]($Math[_random]() * len)))[_join]("");
    } while (uuid_map[_has](result));

    uuid_map[_set](result, 1);

    return result;
};