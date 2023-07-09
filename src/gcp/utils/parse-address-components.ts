import { AddressSegmentsModel } from '../models/addressSegments.model';

interface IAddressComponent {
  short_name: string;
  long_name: string;
  types: string[];
}

export const getAddressObject = (addressComponents: IAddressComponent[]) => {
  const ShouldBeComponent = {
    home: ['street_number'],
    postal_code: ['postal_code'],
    street: ['street_address', 'route'],
    region: [
      'administrative_area_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5',
    ],
    city: [
      'locality',
      'sublocality',
      'sublocality_level_1',
      'sublocality_level_2',
      'sublocality_level_3',
      'sublocality_level_4',
    ],
    country: ['country'],
  };

  const address: AddressSegmentsModel = {
    home: '',
    postal_code: '',
    street: '',
    region: '',
    city: '',
    country: '',
  };

  addressComponents.forEach((component) => {
    for (let shouldBe in ShouldBeComponent) {
      if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
        if (shouldBe === 'country') {
          address[shouldBe] = component.short_name;
        } else {
          address[shouldBe] = component.long_name;
        }
      }
    }
  });
  return address;
};
