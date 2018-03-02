export interface NPIRegistryProvider {
    basic: NPIRegistryBasicInfo;
    addresses: NPIRegistryAddress[];
}

export interface NPIRegistryAddress {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postal_code: string;
}

export interface NPIRegistryBasicInfo {
  status: string;
  credential: string;
  first_name:  string;
  last_name:  string;
  last_updated:  string;
  name:  string;
  gender: string;
  sole_proprietor:  string;
  name_prefix:  string;
  enumeration_date:  string;
}
/*


    {
      "taxonomies": [
        {
          "state: PA",
          "code: 207Q00000X",
          "primary": true,
          "license: MD 0583251",
          "desc: Family Medicine"
        }
      ],
      "addresses": [
        {
          "city: TOWANDA",
          "address_2: ",
          "telephone_number: 570-265-6300",
          "fax_number: 570-268-2807",
          "state: PA",
          "postal_code: 188489710",
          "address_1: 1 HOSPITAL DR",
          "country_code: US",
          "country_name: United States",
          "address_type: DOM",
          "address_purpose: LOCATION"
        },
        {
          "city: TOWANDA",
          "address_2: ",
          "telephone_number: 570-265-6300",
          "fax_number: 570-268-2807",
          "state: PA",
          "postal_code: 188489706",
          "address_1: RR 1 BOX 3J",
          "country_code: US",
          "country_name: United States",
          "address_type: DOM",
          "address_purpose: MAILING"
        }
      ],
      "created_epoch": 1120089600,
      "identifiers": [
        {
          "code: 02",
          "issuer: ",
          "state: ",
          "identifier: B32452",
          "desc: MEDICARE UPIN"
        },
        {
          "code: 04",
          "issuer: ",
          "state: PA",
          "identifier: 882959",
          "desc: MEDICARE ID-Type Unspecified"
        },
        {
          "code: 05",
          "issuer: ",
          "state: PA",
          "identifier: 1590725",
          "desc: MEDICAID"
        }
      ],
      "other_names": [],
      "number": 1871590372,
      "last_updated_epoch": 1321315200,
      "basic": {
        "status: A",
        "credential: MD",
        "first_name: FERNANDO",
        "last_name: CARLOS",
        "last_updated: 2011-11-15",
        "name: CARLOS FERNANDO",
        "gender: M",
        "sole_proprietor: NO",
        "name_prefix: DR.",
        "enumeration_date: 2005-06-30"
      },
      "enumeration_type: NPI-1"
    }
*/