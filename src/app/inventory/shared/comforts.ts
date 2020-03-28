export interface Comfort {
  code: string;
  description: string;
  priority: number;
  icon?: string;
}

export const COMFORTS: Comfort[] = [
  {
    code: 'wifi',
    description: 'Wifi',
    priority: 1,
    icon: 'wifi'
  },
  {
    code: 'tv',
    description: 'Televisión',
    priority: 1,
    icon: 'tv'
  },
  {
    code: 'parking',
    description: 'Parqueadero gratis',
    priority: 1,
    icon: 'local_parking'
  },
  {
    code: 'restaurant',
    description: 'Restaurante',
    priority: 1,
    icon: 'restaurant'
  },
  {
    code: 'freeBreakfast',
    description: 'Desayuno gratis',
    priority: 1,
    icon: 'free_breakfast'
  },
  {
    code: 'gym',
    description: 'Gimnasio',
    priority: 1,
    icon: 'fitness_center'
  },
  {
    code: 'roomService',
    description: 'Servicio a la habitación',
    priority: 1,
    icon: 'room_service'
  },
  {
    code: 'air',
    description: 'Aire acondicionado',
    priority: 1,
    icon: 'ac_unit'
  },
  {
    code: 'pool',
    description: 'Piscina',
    priority: 1,
    icon: 'pool'
  },
  {
    code: 'transport',
    description: 'Transporte gratuito',
    priority: 1,
    icon: 'airport_shuttle'
  },
  {
    code: 'jacuzzi',
    description: 'Jacuzzi',
    priority: 1,
    icon: 'hot_tub'
  },
  {
    code: 'spa',
    description: 'Spa',
    priority: 1,
    icon: 'spa'
  },
  {
    code: 'freeSmock',
    description: 'Libre de humo',
    priority: 2,
    icon: 'smoke_free'
  },
  {
    code: 'canSmock',
    description: 'Permite fumadores',
    priority: 2,
    icon: 'smoking_rooms'
  },
  {
    code: 'security',
    description: 'Caja fuerte',
    priority: 2,
    icon: 'security'
  },
  {
    code: 'bar',
    description: 'Bar',
    priority: 2,
    icon: 'local_bar'
  },
  {
    code: 'golf',
    description: 'Campo de golf',
    priority: 2,
    icon: 'golf_course'
  },
  {
    code: 'casino',
    description: 'Casino',
    priority: 2,
    icon: 'casino'
  },
  {
    code: 'atm',
    description: 'Cajero cercano',
    priority: 3,
    icon: 'local_atm'
  },
  {
    code: 'airport',
    description: 'Aeropuerto cercano',
    priority: 3,
    icon: 'local_airport'
  },
  {
    code: 'hairDryer',
    description: 'Secador de pelo',
    priority: 3,
    icon: 'toys'
  },
  {
    code: 'laundry',
    description: 'Servicio de lavandería',
    priority: 3,
    icon: 'local_laundry_service'
  },
  {
    code: 'alarm',
    description: 'Servicio despertador',
    priority: 3,
    icon: 'alarm'
  },
  {
    code: 'hospital',
    description: 'Hospital cercano',
    priority: 3,
    icon: 'local_hospital'
  }
];
