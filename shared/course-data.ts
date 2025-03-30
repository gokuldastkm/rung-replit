export interface Course {
  id: string;
  name: string;
  shortName: string;
  subtitle?: string;
  description: string;
  features: string[];
  price: number;
}

export const courses: Course[] = [
  {
    id: "kas-win",
    name: "KAS WIN",
    shortName: "KAS",
    subtitle: "Conquer the prelims in 80 days",
    description: "Unlock your KAS success with KAS Win—an intensive 80-day program designed to conquer the Kerala Administrative Service Prelims. Dive into over 7,500 expertly crafted questions, covering every corner of the KAS syllabus.",
    features: [
      "80 Days program",
      "Full Syllabus coverage",
      "7500+ Questions",
      "Comprehensive subject wise Test",
      "Full Length Test"
    ],
    price: 3000,
  },
  {
    id: "degree-prelims",
    name: "Degree Prelims Test series",
    shortName: "Degree",
    description: "Comprehensive test series designed for degree-level examinations with full coverage of all subjects and topics.",
    features: [
      "15 tests",
      "Full syllabus coverage",
      "comprehensive tests"
    ],
    price: 2500,
  },
  {
    id: "10-level-mains",
    name: "10 Level Mains Test series",
    shortName: "10th",
    description: "Extensive test series for 10th level main examinations with detailed analysis and performance tracking.",
    features: [
      "20 tests",
      "Full syllabus coverage",
      "comprehensive tests"
    ],
    price: 2000,
  }
];
