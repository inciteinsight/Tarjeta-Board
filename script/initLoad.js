const secretaryPass = require('../secrets')

const secPass = process.env.secretaryPass || secretaryPass

const ml = [
  {
    id: 'F157',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Villanueva',
    firstName: 'Arlene',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F164',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Mercado',
    firstName: 'Jocelyn',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F205',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Lopez',
    firstName: 'Nenita',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F239',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Dela Cruz',
    firstName: 'Lani',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F243',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Lopez',
    firstName: 'Jo-An',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F245',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Lopez',
    firstName: 'Melba',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F254',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Figueroa',
    firstName: 'Jovel',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M138',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Mercado',
    firstName: 'Rommel',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M169',
    localId: 'B. Beach Ext',
    areaGroup: '1-1',
    lastName: 'Lopez',
    firstName: 'Efraim',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F116',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Perseveranda',
    firstName: 'Mallory',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F129',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Fabellore',
    firstName: 'Ofelia',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F160',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Raagas',
    firstName: 'Patricia',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F236',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Mercado',
    firstName: 'Glenna',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M113',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Fabellore',
    firstName: 'Randy',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M114',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Fabellore',
    firstName: 'Roque',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M152',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Castillo',
    firstName: 'Geraldo',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M158',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Vista',
    firstName: 'William Ray',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M187',
    localId: 'B. Beach Ext',
    areaGroup: '1-2',
    lastName: 'Mercado',
    firstName: 'Angel',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'F233',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Washington',
    firstName: 'Maria Jesusa',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'M131',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Galoyo',
    firstName: 'Samuel',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M197',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Cruz',
    firstName: 'Hermes',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M205',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Pe ',
    firstName: 'Paulo',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M206',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Huelves',
    firstName: 'Richard',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M216',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Hussein',
    firstName: 'Sammy',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'F182',
    localId: 'B. Beach Ext',
    areaGroup: '1-3',
    lastName: 'Schwartz',
    firstName: 'Mary Rose',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F104',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Jose',
    firstName: 'Nerissa',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F106',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Pagulayan',
    firstName: 'Michie',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F117',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Santos',
    firstName: 'Elsa',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F133',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Cecere',
    firstName: 'Melanie',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F261',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Gutierrez',
    firstName: 'Jizelle Maia',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'M104',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Chut',
    firstName: 'Manuel',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M106',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Santos',
    firstName: 'Danilo',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M107',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Santos',
    firstName: 'Mark Justin',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M118',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Santiago',
    firstName: 'Aristotle',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M173',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Lara',
    firstName: 'Gerald',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M202',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'Cecere',
    firstName: 'Thomas',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M209',
    localId: 'Manhattan',
    areaGroup: '1-1',
    lastName: 'De Castro',
    firstName: 'Mark Anthony',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'F103',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Macaranas',
    firstName: 'Lambda',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F109',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Tucker',
    firstName: 'Elizabeth',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F112',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Barretto',
    firstName: 'Florie',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F113',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Fernandez',
    firstName: 'Rosita',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F145',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Medina',
    firstName: 'Ma. Teresa',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F176',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Mullon',
    firstName: 'Eden',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F204',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Cruz',
    firstName: 'Donna Bernice',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F235',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Figueroa',
    firstName: 'Katherine',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F240',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Quintos',
    firstName: 'Reizel ',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F253',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Macaranas',
    firstName: 'Lara',
    cfo: 'BH',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F266',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Gravador',
    firstName: 'Krysstia',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F269',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Albarillo',
    firstName: 'Ruby',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M175',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Macaranas',
    firstName: 'Lance Rafael',
    cfo: 'BH',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M186',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Figueroa',
    firstName: 'Luke',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M211',
    localId: 'Manhattan',
    areaGroup: '1-2',
    lastName: 'Medina',
    firstName: 'Joshua',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'F101',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Arsciwals',
    firstName: 'Carmencita',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F105',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Zarate',
    firstName: 'Wilma',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F120',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Cabaron',
    firstName: 'Claire',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F123',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Nagasangan',
    firstName: 'Noven Rose',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F153',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Cruz',
    firstName: 'Tiffany',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F196',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Jose',
    firstName: 'Diana',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F212',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Lamagna',
    firstName: 'Allyzabeth',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F229',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Soriano',
    firstName: 'Joanne',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F250',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Mendoza',
    firstName: 'Charmaine',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F251',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Arbis',
    firstName: 'Allyson',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F256',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Merdegia',
    firstName: 'Nicole',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F259',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Sahagun',
    firstName: 'Ageline',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M146',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Nagasangan',
    firstName: 'Jansel',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M153',
    localId: 'Manhattan',
    areaGroup: '1-3',
    lastName: 'Soriano',
    firstName: 'Bobby',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F110',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Valdez',
    firstName: 'Jamie Lee',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F137',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Mendoza',
    firstName: 'Aina',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F138',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Mendoza',
    firstName: 'Lolita',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F180',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Dorado',
    firstName: 'Myrna',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F206',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Ko',
    firstName: 'Andrea',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F225',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Ko',
    firstName: 'Helen',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F255',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Oria',
    firstName: 'Kimberly',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F258',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Teves',
    firstName: 'Myko Angeline',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M117',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Mendoza',
    firstName: 'Florentino',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M145',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Valdez',
    firstName: 'Lloyd Ryan',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M204',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Oria',
    firstName: 'David',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M207',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Rapisura',
    firstName: 'Riki',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M215',
    localId: 'Manhattan',
    areaGroup: '1-4',
    lastName: 'Dorado',
    firstName: 'Jaime',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F119',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Bautista',
    firstName: 'Mesalina',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F122',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Dilao',
    firstName: 'Thelma',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F124',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Manalo',
    firstName: 'Pilar',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F126',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Edralin',
    firstName: 'Videa',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F148',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Edralin',
    firstName: 'Jane',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F156',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Cruz',
    firstName: 'Meliza',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F213',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Ndjongo',
    firstName: 'Sherah Janay',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F265',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Santiago',
    firstName: 'Julia',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F268',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Gillego',
    firstName: 'Lorie Marie',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M108',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Edralin',
    firstName: 'Ronaldo',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M151',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Gillego',
    firstName: 'Joshua',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M181',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Lacey',
    firstName: 'Amia',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M199',
    localId: 'Manhattan',
    areaGroup: '1-5',
    lastName: 'Corpuz',
    firstName: 'Maxwel',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F174',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Frank',
    firstName: 'Dorothy',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F183',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Beltran',
    firstName: 'Khaila Jesu',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F184',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Arce',
    firstName: 'Jean Chris',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F202',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Beltran',
    firstName: 'Cielito',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F223',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Trinona',
    firstName: 'Alrence',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F242',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Lubrin',
    firstName: 'Lujee',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'M194',
    localId: 'Manhattan',
    areaGroup: '1-6',
    lastName: 'Lubrin',
    firstName: 'Carl Leo',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F127',
    localId: 'Manhattan',
    areaGroup: '1-7',
    lastName: 'Inociaan',
    firstName: 'Glenda',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F134',
    localId: 'Manhattan',
    areaGroup: '1-7',
    lastName: 'Baesa',
    firstName: 'Emerita',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F249',
    localId: 'Manhattan',
    areaGroup: '1-7',
    lastName: 'Inociaan',
    firstName: 'Virginia',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'M116',
    localId: 'Manhattan',
    areaGroup: '1-7',
    lastName: 'Inociaan',
    firstName: 'Oliver',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M212',
    localId: 'Manhattan',
    areaGroup: '1-7',
    lastName: 'Inociaan',
    firstName: 'Solomon',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F108',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Knight',
    firstName: 'Louise Kimberly',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F151',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Tomas',
    firstName: 'Ma. Luisa',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F152',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Ramos',
    firstName: 'Louise Margaret',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F198',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Ladines',
    firstName: 'Samantha Nicole',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F230',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Herrera',
    firstName: 'Precious Amethyst',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M102',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Tomas',
    firstName: 'Rolando',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M125',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Tomas',
    firstName: 'Lance Roland',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M126',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Knight',
    firstName: 'Matthew',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M127',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Ramos',
    firstName: 'Jorge',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M164',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Masaga',
    firstName: 'Gen Mark',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M172',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Nobello',
    firstName: 'Mark Jerome',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M178',
    localId: 'Manhattan',
    areaGroup: '2-1',
    lastName: 'Sese',
    firstName: 'Jordan',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'F150',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Sanchez',
    firstName: 'Alpa',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F161',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Mendoza',
    firstName: 'Betheddie',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F162',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Mendoza',
    firstName: 'Katrina Beatrice',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F167',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Clifford',
    firstName: 'Sabrina',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F241',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Dagotdot',
    firstName: 'Sharlene',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F262',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Adalla',
    firstName: 'Sophia Faith',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M129',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Facundo',
    firstName: 'Miguel Luis',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M198',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Adalla',
    firstName: 'Raoul, Jr',
    cfo: 'B',
    officer: 'RM',
    gender: 'MALE'
  },
  {
    id: 'M210',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Dagotdot',
    firstName: 'Daniel',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M213',
    localId: 'Manhattan',
    areaGroup: '2-2',
    lastName: 'Stirba',
    firstName: 'Clifford',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'F111',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Martin',
    firstName: 'Consuelo',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F114',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Martin',
    firstName: 'Karen',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F154',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Marges',
    firstName: 'Cristina',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F155',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'MArges',
    firstName: 'Kesha Beatriz',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F227',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Perez',
    firstName: 'Arlene',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F260',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Javier',
    firstName: 'Jan Czarina',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F267',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'De Guzman',
    firstName: 'Jinky',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'M105',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Martin',
    firstName: 'Gil',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M133',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Palabasan',
    firstName: 'Roger Lester',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M135',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Tepait ',
    firstName: 'Felizardo',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M137',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Marges',
    firstName: 'Chris Jamieson',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M144',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Marges',
    firstName: 'Juan Christohper',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M190',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Marges',
    firstName: 'Juancho ',
    cfo: 'B',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M195',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Mallari',
    firstName: 'Gene Louiese',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'M203',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Apelo',
    firstName: 'David',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M214',
    localId: 'Manhattan',
    areaGroup: '2-3',
    lastName: 'Guzman',
    firstName: 'Vincent',
    cfo: 'K',
    officer: 'N',
    gender: 'MALE'
  },
  {
    id: 'F187',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Belen',
    firstName: 'Myrdan',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F208',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Amiscosa',
    firstName: 'Necita',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F228',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Sanchez',
    firstName: 'Vanessa Joyce',
    cfo: 'B',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F234',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Flores',
    firstName: 'Freny',
    cfo: 'B',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F237',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Ison',
    firstName: 'Emily',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F244',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Katindig',
    firstName: 'Jann Erissa',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'F263',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Williams',
    firstName: 'Courtney',
    cfo: 'K',
    officer: 'N',
    gender: 'FEMALE'
  },
  {
    id: 'F264',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Cruz',
    firstName: 'Katrina',
    cfo: 'K',
    officer: 'Y',
    gender: 'FEMALE'
  },
  {
    id: 'M121',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Flores',
    firstName: 'Rolando, Jr.',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M132',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Ricarto',
    firstName: 'Ruel',
    cfo: 'K',
    officer: 'Y',
    gender: 'MALE'
  },
  {
    id: 'M136',
    localId: 'Manhattan',
    areaGroup: '2-4',
    lastName: 'Robles',
    firstName: 'Ronald',
    cfo: 'B',
    officer: 'Y',
    gender: 'MALE'
  }
]

const localCongregations = [
  {
    id: 'MANNYUS',
    name: 'Manhattan, NY',
    schedule: [
      {
        serviceType: 'Midweek',
        day: 'Tuesday',
        time: '20:00:00'
      },
      {
        serviceType: 'Weekend',
        day: 'Saturday',
        time: '09:00:00'
      },
      {
        serviceType: 'CWS',
        day: 'Saturday',
        time: '12:00:00'
      }
    ]
  }
  // ,{
  //   id: "LICNY",
  //   name: "Long Island City, NY",
  //   schedule: [
  //     {
  //       serviceType: 'Midweek',
  //       day: 'Thursday',
  //       time: '05:45:00'
  //     },
  //     {
  //       serviceType: 'Midweek',
  //       day: 'Thursday',
  //       time: '19:45:00'
  //     },
  //     {
  //       serviceType: 'Weekend',
  //       day: 'Saturday',
  //       time: '19:30:00'
  //     },
  //     {
  //       serviceType: 'Weekend',
  //       day: 'Sunday',
  //       time: '08:00:00'
  //     },
  //     {
  //       serviceType: 'CWS',
  //       day: 'Sunday',
  //       time: '10:30:00'
  //     },
  //     {
  //       serviceType: 'Weekend',
  //       day: 'Sunday',
  //       time: '13:00:00'
  //     }
  //   ]
  // }
]

const extensionCongregations = [
  {
    id: 'BBxNYUS',
    name: 'Brighton Beach Ext., NY',
    extensionOfId: 'MANNYUS',
    schedule: [
      {
        serviceType: 'Midweek',
        day: 'Wednesday',
        time: '20:00:00'
      }
    ]
  }
  //, {
  //   id: "WDLICNY",
  //   name: "Woodside Ext., NY",
  //   extensionOfId: "LICNY",
  //   schedule:
  //   [
  //     {
  //       serviceType: 'Midweek',
  //       day: 'Wednesday',
  //       time: '20:00:00'
  //     }
  //   ]
  // },
  // {
  //   id: "BKLICNY",
  //   name: "Brooklyn Ext., NY",
  //   extensionOfId: "LICNY",
  //   schedule:
  //   [
  //     {
  //       serviceType: 'Midweek',
  //       day: 'Tuesday',
  //       time: '20:00:00'
  //     },
  //     {
  //       serviceType: 'Weekend',
  //       day: 'Sunday',
  //       time: '17:00:00'
  //     }
  //   ]
  // }
]

const secretaries = [
  {email: 'nherizjjose87@gmail.com', password: secPass},
  {email: 'Jamievaldez.inc@gmail.com', password: secPass}
]

module.exports = {
  ml,
  localCongregations,
  extensionCongregations,
  secretaries
}
