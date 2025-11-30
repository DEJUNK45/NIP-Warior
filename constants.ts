import { StudyMaterial, Question } from './types';

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'twk',
    title: 'Tes Wawasan Kebangsaan (TWK)',
    desc: 'Nasionalisme, Integritas, Bela Negara, Pilar Negara',
    color: 'bg-red-100 text-red-700',
    modules: [
      { title: 'Sejarah Perumusan Pancasila', type: 'Video', duration: '5 min', completed: true },
      { title: 'Pasal-Pasal UUD 1945 (Cheat Sheet)', type: 'Bacaan', duration: '10 min', completed: true },
      { title: 'Pengamalan Sila dalam Kehidupan', type: 'Kuis', duration: '15 soal', completed: false },
    ]
  },
  {
    id: 'tiu',
    title: 'Tes Intelegensia Umum (TIU)',
    desc: 'Verbal, Numerik, Logika Analitis',
    color: 'bg-blue-100 text-blue-700',
    modules: [
      { title: 'Trik Cepat Deret Angka', type: 'Video', duration: '4 min', completed: true },
      { title: 'Logika Silogisme', type: 'Bacaan', duration: '8 min', completed: false },
      { title: 'Drill Soal Perbandingan', type: 'Kuis', duration: '10 soal', completed: false },
    ]
  },
  {
    id: 'tkp',
    title: 'Tes Karakteristik Pribadi (TKP)',
    desc: 'Pelayanan Publik, Jejaring Kerja, Sosial Budaya',
    color: 'bg-green-100 text-green-700',
    modules: [
      { title: 'Konsep Pelayanan Prima', type: 'Video', duration: '6 min', completed: true },
      { title: 'Studi Kasus: Konflik di Kantor', type: 'Bacaan', duration: '5 min', completed: false },
    ]
  }
];

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'TWK',
    question: "Kedudukan Pancasila sebagai dasar negara Indonesia tercantum di dalam...",
    options: [
      "Batang Tubuh UUD 1945",
      "Pembukaan UUD 1945 alinea ke-4",
      "Pembukaan UUD 1945 alinea ke-2",
      "Tap MPR No. II/MPR/1978",
      "Dekrit Presiden 5 Juli 1959"
    ],
    correctAnswer: 1 
  },
  {
    id: 2,
    type: 'TIU',
    question: "Semua calon pegawai negeri sipil menempuh tes CPNS. Sebagian peserta tes CPNS memiliki skor di atas ambang batas. Kesimpulan yang paling tepat adalah...",
    options: [
      "Sebagian calon pegawai negeri sipil tidak menempuh tes CPNS.",
      "Semua peserta tes CPNS adalah calon pegawai negeri sipil.",
      "Sebagian calon pegawai negeri sipil memiliki skor di atas ambang batas.",
      "Semua calon pegawai negeri sipil memiliki skor di atas ambang batas.",
      "Tidak dapat ditarik kesimpulan."
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    type: 'TIU',
    question: "Jika 2, 5, 10, 17, 26, ..., maka angka selanjutnya adalah?",
    options: [
      "35",
      "36",
      "37",
      "38",
      "39"
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    type: 'TKP',
    question: "Anda adalah petugas loket. Tiba-tiba antrian membludak dan sistem komputer mengalami gangguan. Apa yang Anda lakukan?",
    options: [
      "Menutup loket sampai komputer benar.",
      "Meminta teknisi segera memperbaiki dan menenangkan warga.",
      "Melayani secara manual sebisanya sambil menunggu teknisi.",
      "Melapor kepada atasan dan meminta arahan.",
      "Meminta warga untuk datang kembali besok."
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    type: 'TWK',
    question: "Perjanjian Renville ditandatangani di atas kapal perang milik negara...",
    options: [
      "Inggris",
      "Belanda",
      "Amerika Serikat",
      "Jepang",
      "Australia"
    ],
    correctAnswer: 2
  }
];