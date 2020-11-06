import { Injectable } from '@angular/core';
//import {} from 'automapper-ts';
import { AppConsts } from '../shared/app-consts';

@Injectable()
export class MapperService {
  automapper: any;
  constructor() { }

  get mapper(): any {
    return this.automapper;
  }

  createMap(from: string, to: string): MapProfile {
    return new MapProfile(this.mapper.createMap(from, to), this);
  }

  map(from: string, to: string, instance: any): any {
    return this.mapper.map(from, to, instance);
  }
}

class FormDefinitionMapper {
  
  mapWidth(width: number): string {
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
  }

}

export class MapProfile {

  constructor(private profile, private mapper: MapperService) {
  }

  forMember(prop: string, valueOrFunction: any): any {
    return this.profile.forMember(prop, valueOrFunction);
  }

  mapLanguageDto(prop: string, languages: string[]): MapProfile {
    this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
    languages.forEach((language) => {
      this.profile = this.forMember(prop + language, function (opts) {
        if (opts.sourceObject[prop]) {
          return opts.sourceObject[prop].find((x) => x.language === language).value;
        } else {
          return 'Localized name unset for ' + prop;
        }
      });
    });
    return this;
  }

  mapMultiselectTagCollection(prop: string, codeProp?: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) {
      const codeProperty = codeProp ? codeProp : 'code';
      return opts.sourceObject[prop].tagValues.map(x => ({ id: x.tagId, names: x.names, [codeProperty]: x[codeProperty] }));
    });
    return this;
  }

  mapSelectTagCollection(prop: string, codeProp?: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) {
      const codeProperty = codeProp ? codeProp : 'code';
      const firstElement = opts.sourceObject[prop].tagValues.length ? opts.sourceObject[prop].tagValues[0] : null;
      return firstElement ? { id: firstElement.tagId, names: firstElement.names, codeProperty: firstElement[codeProperty] } : null;
    });
    return this;
  }

  mapDtoProperties(prop: string, dtoArrayProps?: string[]): MapProfile {
    this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
    this.forMember(AppConsts.dtoMapperProp, (opts) => {
      Object.keys(opts.sourceObject[prop]).forEach((key) => {
        if (dtoArrayProps && dtoArrayProps.indexOf(key) > -1) {
          this.mapArrayOfDtosByProperty(opts.sourceObject[prop][key], prop, key);
        } else {
          this.profile = this.forMember((prop + AppConsts.dtoMapperProp + key), function (keyOpts) {
            return keyOpts.sourceObject[prop][key];
          });
        }
      });
    });
    return this;
  }

  mapArrayOfDtosByProperty(items: object[], parentProp: string, childProp: string): MapProfile {
    items.forEach((item, index) => {
      this.profile = this.forMember((childProp + AppConsts.dtoMapperProp + index), (opts) => {
        return opts.sourceObject[parentProp][childProp][index];
      });
    });
    return this;
  }

  mapArrayOfDtos(prop: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
    this.forMember(AppConsts.dtoMapperProp, (opts) => {
      if (opts.sourceObject[prop]) {
        opts.sourceObject[prop].forEach((item, index) => {
          Object.keys(item.toJSON()).forEach((key) => {
            this.profile = this.forMember((prop + AppConsts.dtoMapperProp + key + index), (opts) => {
              return opts.sourceObject[prop][index] ? opts.sourceObject[prop][index][key] : null;
            })
          })
        });
      }
    });
    return this;
  }

  mapFormArray(prop: string, className: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
    const mapper = this.mapper;
    this.profile = this.forMember(AppConsts.formArrayMapperProp + prop, function (opts) {
      return opts.sourceObject[prop].map((item) => {
        return mapper.map(className, AppConsts.mapperFgm, item);
      });
    });
    return this;
  }

  mapNestedFormGroup(prop: string, className: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) { opts.ignore(); });
    const mapper = this.mapper;
    this.profile = this.forMember(AppConsts.nestedFormGroupProp + prop, function (opts) {
      return mapper.map(className, AppConsts.mapperFgm, opts.sourceObject[prop]);
    });
    return this;
  }

  unmapLanguageDto(prop: string, languages: string[]): MapProfile {
    this.profile = this.forMember(prop, function (opts) {
      return languages.map((language) => {
        return { language: language, value: opts.sourceObject[prop + language] };
      });
    });
    languages.forEach((language) => {
      this.profile = this.forMember(prop + language, function (opts) { opts.ignore(); });
    });
    return this;
  }

  unmapMultiselectTagCollection(prop: string, type: string = '', codeProp?: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) {
      if (!type) {
        type = prop.toLowerCase();
        if (type.endsWith('tags')) {
          // Remove "tags" from the end if it exists
          type = type.slice(0, -4);
        }
      }
      const codeProperty = codeProp ? codeProp : 'code';
      return {
        tagType: type,
        tagValues: opts.sourceObject[prop] ?
          opts.sourceObject[prop].map((x) => ({ 'tagId': x.id, names: x.names, code: x[codeProperty] })) : []
      };
    });
    return this;
  }

  unmapSelectTagCollection(prop: string, type: string = '', codeProp?: string): MapProfile {
    this.profile = this.forMember(prop, function (opts) {
      if (!type) {
        type = prop.toLowerCase();
        if (type.endsWith('tags')) {
          // Remove "tags" from the end if it exists
          type = type.slice(0, -4);
        }
      }
      const codeProperty = codeProp ? codeProp : 'code';
      return {
        tagType: type,
        tagValues: opts.sourceObject[prop] ?
          [{ 'tagId': opts.sourceObject[prop].id, names: opts.sourceObject[prop].names, code: opts.sourceObject[prop][codeProperty] }] : []
      };
    });
    return this;
  }

  unmapDtoProperties(prop: string): MapProfile {
    this.profile = this.forMember((prop), (opts) => {
      const newDto = {};
      Object.keys(opts.sourceObject).forEach((key) => {
        if (key.startsWith(prop + AppConsts.dtoMapperProp)) {
          newDto[key.replace(prop + AppConsts.dtoMapperProp, '')] = opts.sourceObject[key];
        }
      });
      return newDto;
    });
    return this;
  }

  unmapArrayOfDtos(prop: string): MapProfile {
    this.profile = this.forMember((prop), (opts) => {
      const newArray: Object[] = [];
      Object.keys(opts.sourceObject).forEach((key) => {
        if (key.startsWith(prop)) {
          const index = Number(key.slice(key.length - 1));
          if (!newArray[index]) {
            newArray[index] = {};
          }
          const newKey = key.replace(prop + AppConsts.dtoMapperProp, '').replace(index.toString(), '');
          newArray[index][newKey] = opts.sourceObject[key];
        }
      })
      return newArray;
    })
    return this
  }

  unmapArrayOfDtosByProperty(prop: string, dtoArrayProps: string[]): MapProfile {
    this.profile = this.forMember((prop), (opts) => {
      const newDto = {};
      dtoArrayProps.forEach((arrayProp) => {
        newDto[arrayProp] = [];
        Object.keys(opts.sourceObject).forEach((key) => {
          if (key.startsWith(arrayProp)) {
            const index = Number(key.slice(key.indexOf(AppConsts.dtoMapperProp) + AppConsts.dtoMapperProp.length));
            newDto[arrayProp][index] = opts.sourceObject[key];
          }
        });
      });
      return newDto;
    });
    return this;
  }

  unmapFormArray(prop: string, className: string): MapProfile {
    const mapper = this.mapper;
    this.profile = this.forMember(prop, (opts) => {
      return mapper.map(AppConsts.mapperFgm, className, opts.sourceObject[AppConsts.formArrayMapperProp + prop]);
    });
    return this;
  }

  unmapNestedFormGroup(prop: string, className: string): MapProfile {
    const mapper = this.mapper;
    this.profile = this.forMember(prop, (opts) => {
      return mapper.map(AppConsts.mapperFgm, className, opts.sourceObject[AppConsts.nestedFormGroupProp + prop]);
    });
    return this;
  }

}
