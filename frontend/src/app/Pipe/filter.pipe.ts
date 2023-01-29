import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredValue:string ) {
    if(value){
      if(filteredValue === ''){
        return value;
      }
  
      const cities = value.filter((val:any) => val.City.toLowerCase().includes(filteredValue.toLocaleLowerCase()));
      return cities;
  
    }
  }

}
