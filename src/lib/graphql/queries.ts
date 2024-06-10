import { gql, type TypedDocumentNode } from "@apollo/client";

export interface SpellsQuery {
  spells: {
    name: string;
    index: string;
    level: number;
    school: {
      name: string;
      index: string;
    }
  }[];
}

export const GET_ALL_SPELLS: TypedDocumentNode<SpellsQuery> = gql`
  query GetAllSpells {
    spells {
      name
      index
      level
      school {
        name
        index
      }
    }
  }
`;

export interface MonstersQuery {
  monsters: {
    index: string;
    name: string;
    type: string;
    challenge_rating: number;
  }[];
}

export const GET_ALL_MONSTERS: TypedDocumentNode<MonstersQuery> = gql`
  query GetAllMonsters {
    monsters {
      index
      name
      type
      challenge_rating
    }
  }
`;

export interface MagicItemsQuery {
  magicItems: {
    index: string;
    name: string;
    rarity: string;
    equipment_category: {
      name: string;
    };
  }[];
}

export const GET_ALL_MAGIC_ITEMS: TypedDocumentNode<MagicItemsQuery> = gql`
  query GetMagicItems {
    magicItems {
      index
      name
      rarity
      equipment_category {
        name
      }
    }
  }
`;

export interface EquipmentsQuery {
  equipments: {
    index: string;
    name: string;
    weight: number;
    cost: {
      unit: string;
      quantity: number;
    };
    equipment_category: {
      name: string;
    };
  }[];
}


export const GET_ALL_EQUIPMENT: TypedDocumentNode<EquipmentsQuery> = gql`
  query GetAllEquipment {
    equipments {
      index
      name
      weight
      cost {
        quantity
        unit
      }
      equipment_category {
        name
      }
    }
  }
`;

export interface RuleQuery {
  rule: {
    name: string;
    index: string;
    desc: string;
    subsections: {
      name: string;
      index: string;
      desc: string;
    }[]
  }
}

export const GET_RULE: TypedDocumentNode<RuleQuery> = gql`
  query GetRule($index: String) {
    rule(index: $index) {
      name
      index
      desc
      subsections {
        name
        index
        desc
      }
    }
  }
`;