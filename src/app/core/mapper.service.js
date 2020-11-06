import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
//import {} from 'automapper-ts';
import { AppConsts } from '../shared/app-consts';
var MapperService = /** @class */ (function () {
    function MapperService() {
    }
    Object.defineProperty(MapperService.prototype, "mapper", {
        get: function () {
            return this.automapper;
        },
        enumerable: false,
        configurable: true
    });
    MapperService.prototype.createMap = function (from, to) {
        return new MapProfile(this.mapper.createMap(from, to), this);
    };
    MapperService.prototype.map = function (from, to, instance) {
        return this.mapper.map(from, to, instance);
    };
    MapperService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], MapperService);
    return MapperService;
}());
export { MapperService };
var FormDefinitionMapper = /** @class */ (function () {
    function FormDefinitionMapper() {
    }
    FormDefinitionMapper.prototype.mapWidth = function (width) {
        switch (width) {
            case 100:
                return 'col-12';
            case 75:
                return 'col-9';
            case 50:
                return 'col-6';
            case 25:
                return 'col-3';
            default:
                return null;
        }
    };
    return FormDefinitionMapper;
}());
var MapProfile = /** @class */ (function () {
    function MapProfile(profile, mapper) {
        this.profile = profile;
        this.mapper = mapper;
    }
    MapProfile.prototype.forMember = function (prop, valueOrFunction) {
        return this.profile.forMember(prop, valueOrFunction);
    };
    MapProfile.prototype.mapLanguageDto = function (prop, languages) {
        var _this = this;
        this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
        languages.forEach(function (language) {
            _this.profile = _this.forMember(prop + language, function (opts) {
                if (opts.sourceObject[prop]) {
                    return opts.sourceObject[prop].find(function (x) { return x.language === language; }).value;
                }
                else {
                    return 'Localized name unset for ' + prop;
                }
            });
        });
        return this;
    };
    MapProfile.prototype.mapMultiselectTagCollection = function (prop, codeProp) {
        this.profile = this.forMember(prop, function (opts) {
            var codeProperty = codeProp ? codeProp : 'code';
            return opts.sourceObject[prop].tagValues.map(function (x) {
                var _a;
                return (_a = { id: x.tagId, names: x.names }, _a[codeProperty] = x[codeProperty], _a);
            });
        });
        return this;
    };
    MapProfile.prototype.mapSelectTagCollection = function (prop, codeProp) {
        this.profile = this.forMember(prop, function (opts) {
            var codeProperty = codeProp ? codeProp : 'code';
            var firstElement = opts.sourceObject[prop].tagValues.length ? opts.sourceObject[prop].tagValues[0] : null;
            return firstElement ? { id: firstElement.tagId, names: firstElement.names, codeProperty: firstElement[codeProperty] } : null;
        });
        return this;
    };
    MapProfile.prototype.mapDtoProperties = function (prop, dtoArrayProps) {
        var _this = this;
        this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
        this.forMember(AppConsts.dtoMapperProp, function (opts) {
            Object.keys(opts.sourceObject[prop]).forEach(function (key) {
                if (dtoArrayProps && dtoArrayProps.indexOf(key) > -1) {
                    _this.mapArrayOfDtosByProperty(opts.sourceObject[prop][key], prop, key);
                }
                else {
                    _this.profile = _this.forMember((prop + AppConsts.dtoMapperProp + key), function (keyOpts) {
                        return keyOpts.sourceObject[prop][key];
                    });
                }
            });
        });
        return this;
    };
    MapProfile.prototype.mapArrayOfDtosByProperty = function (items, parentProp, childProp) {
        var _this = this;
        items.forEach(function (item, index) {
            _this.profile = _this.forMember((childProp + AppConsts.dtoMapperProp + index), function (opts) {
                return opts.sourceObject[parentProp][childProp][index];
            });
        });
        return this;
    };
    MapProfile.prototype.mapArrayOfDtos = function (prop) {
        var _this = this;
        this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
        this.forMember(AppConsts.dtoMapperProp, function (opts) {
            if (opts.sourceObject[prop]) {
                opts.sourceObject[prop].forEach(function (item, index) {
                    Object.keys(item.toJSON()).forEach(function (key) {
                        _this.profile = _this.forMember((prop + AppConsts.dtoMapperProp + key + index), function (opts) {
                            return opts.sourceObject[prop][index] ? opts.sourceObject[prop][index][key] : null;
                        });
                    });
                });
            }
        });
        return this;
    };
    MapProfile.prototype.mapFormArray = function (prop, className) {
        this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
        var mapper = this.mapper;
        this.profile = this.forMember(AppConsts.formArrayMapperProp + prop, function (opts) {
            return opts.sourceObject[prop].map(function (item) {
                return mapper.map(className, AppConsts.mapperFgm, item);
            });
        });
        return this;
    };
    MapProfile.prototype.mapNestedFormGroup = function (prop, className) {
        this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
        var mapper = this.mapper;
        this.profile = this.forMember(AppConsts.nestedFormGroupProp + prop, function (opts) {
            return mapper.map(className, AppConsts.mapperFgm, opts.sourceObject[prop]);
        });
        return this;
    };
    MapProfile.prototype.unmapLanguageDto = function (prop, languages) {
        var _this = this;
        this.profile = this.forMember(prop, function (opts) {
            return languages.map(function (language) {
                return { language: language, value: opts.sourceObject[prop + language] };
            });
        });
        languages.forEach(function (language) {
            _this.profile = _this.forMember(prop + language, function (opts) { opts.ignore(); });
        });
        return this;
    };
    MapProfile.prototype.unmapMultiselectTagCollection = function (prop, type, codeProp) {
        if (type === void 0) { type = ''; }
        this.profile = this.forMember(prop, function (opts) {
            if (!type) {
                type = prop.toLowerCase();
                if (type.endsWith('tags')) {
                    // Remove "tags" from the end if it exists
                    type = type.slice(0, -4);
                }
            }
            var codeProperty = codeProp ? codeProp : 'code';
            return {
                tagType: type,
                tagValues: opts.sourceObject[prop] ?
                    opts.sourceObject[prop].map(function (x) { return ({ 'tagId': x.id, names: x.names, code: x[codeProperty] }); }) : []
            };
        });
        return this;
    };
    MapProfile.prototype.unmapSelectTagCollection = function (prop, type, codeProp) {
        if (type === void 0) { type = ''; }
        this.profile = this.forMember(prop, function (opts) {
            if (!type) {
                type = prop.toLowerCase();
                if (type.endsWith('tags')) {
                    // Remove "tags" from the end if it exists
                    type = type.slice(0, -4);
                }
            }
            var codeProperty = codeProp ? codeProp : 'code';
            return {
                tagType: type,
                tagValues: opts.sourceObject[prop] ?
                    [{ 'tagId': opts.sourceObject[prop].id, names: opts.sourceObject[prop].names, code: opts.sourceObject[prop][codeProperty] }] : []
            };
        });
        return this;
    };
    MapProfile.prototype.unmapDtoProperties = function (prop) {
        this.profile = this.forMember((prop), function (opts) {
            var newDto = {};
            Object.keys(opts.sourceObject).forEach(function (key) {
                if (key.startsWith(prop + AppConsts.dtoMapperProp)) {
                    newDto[key.replace(prop + AppConsts.dtoMapperProp, '')] = opts.sourceObject[key];
                }
            });
            return newDto;
        });
        return this;
    };
    MapProfile.prototype.unmapArrayOfDtos = function (prop) {
        this.profile = this.forMember((prop), function (opts) {
            var newArray = [];
            Object.keys(opts.sourceObject).forEach(function (key) {
                if (key.startsWith(prop)) {
                    var index = Number(key.slice(key.length - 1));
                    if (!newArray[index]) {
                        newArray[index] = {};
                    }
                    var newKey = key.replace(prop + AppConsts.dtoMapperProp, '').replace(index.toString(), '');
                    newArray[index][newKey] = opts.sourceObject[key];
                }
            });
            return newArray;
        });
        return this;
    };
    MapProfile.prototype.unmapArrayOfDtosByProperty = function (prop, dtoArrayProps) {
        this.profile = this.forMember((prop), function (opts) {
            var newDto = {};
            dtoArrayProps.forEach(function (arrayProp) {
                newDto[arrayProp] = [];
                Object.keys(opts.sourceObject).forEach(function (key) {
                    if (key.startsWith(arrayProp)) {
                        var index = Number(key.slice(key.indexOf(AppConsts.dtoMapperProp) + AppConsts.dtoMapperProp.length));
                        newDto[arrayProp][index] = opts.sourceObject[key];
                    }
                });
            });
            return newDto;
        });
        return this;
    };
    MapProfile.prototype.unmapFormArray = function (prop, className) {
        var mapper = this.mapper;
        this.profile = this.forMember(prop, function (opts) {
            return mapper.map(AppConsts.mapperFgm, className, opts.sourceObject[AppConsts.formArrayMapperProp + prop]);
        });
        return this;
    };
    MapProfile.prototype.unmapNestedFormGroup = function (prop, className) {
        var mapper = this.mapper;
        this.profile = this.forMember(prop, function (opts) {
            return mapper.map(AppConsts.mapperFgm, className, opts.sourceObject[AppConsts.nestedFormGroupProp + prop]);
        });
        return this;
    };
    return MapProfile;
}());
export { MapProfile };
//# sourceMappingURL=mapper.service.js.map