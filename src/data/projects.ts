export interface IProject {
  _id: string;
  title: string;
  description: string;
  client: string;
  completionTime: string;
  technologies: string;
  imageURL: string;
  demo: string;
  github: string;
  status: string;
}

export const projects: IProject[] = [
  {
    _id: "pro_pos",
    title: "Lenden – Point-of-Sale & Inventory Management System",
    description:
      "Built a full-featured POS and inventory management web application for retail businesses. The system covers purchase management with multi-payment and installment support, sales processing, purchase returns, expense tracking, and supplier/customer management. Includes a product catalog with serial number and warranty tracking, real-time stock monitoring, and a dashboard for business analytics. The frontend is a client-side SPA that communicates with a NestJS REST API backend.",
    client: "Stackleo",
    completionTime: "Ongoing",
    technologies:
      "React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, React Hook Form, Zod, Axios, React Router, Redux Toolkit, NestJS",
    imageURL:
      "https://res.cloudinary.com/dax7o8z1f/image/upload/v1778777220/screencapture-lenden-stackleo-dashboard-2026-05-14-22_45_08_m58kcb.png",
    demo: "https://lenden.stackleo.com/",
    github: "",
    status: "active",
  },
  {
    _id: "68043580209c359a630ad171",
    title: "Sales & Order Management Dashboard – Fair Value Ltd",
    description:
      "Developed a responsive admin dashboard for monitoring sales performance, order processing, and customer activity. Implemented real-time data visualization including total sales, monthly trends, order summaries, and hub-wise analytics. Focused on clean UX/UI, role-based navigation, and scalable component structure using modern front-end technologies.",
    client: "Akij food and Beverage Ltd",
    completionTime: "4 months",
    technologies: "Nextjs, Node.js, Mongodb, Sanity",
    imageURL:
      "http://res.cloudinary.com/dax7o8z1f/image/upload/v1745106303/fjfubbzyaei9wisofm8g.png",
    demo: "",
    github: "",
    status: "active",
  },
  {
    _id: "680c58789c9c800729815125",
    title: "Bankist Management – Minimalist Banking User Experience",
    description:
      "Bankist Management is a sleek and fully digital banking platform designed to simplify personal finance. It features a secure login system, real-time account overview, seamless money transfers, and loan request functionality. The intuitive interface is responsive and optimized for all devices, delivering a consistent user experience. Built with modern front-end practices, this project highlights clean UI/UX design and efficient JavaScript logic.",
    client: "Personal Project",
    completionTime: "1 month",
    technologies: "HTML, CSS, Vanilla Javascript",
    imageURL:
      "http://res.cloudinary.com/dax7o8z1f/image/upload/v1745804001/r1tcc9wy7lrtszlnfv2s.png",
    demo: "https://bankistmanagement.netlify.app/",
    github: "https://github.com/MohammadSiam/bankist_website",
    status: "active",
  },
  {
    _id: "680c56c39c9c800729815120",
    title: "University Application Management System – UAPP",
    description:
      "Built an intuitive dashboard for managing university applications, student data, and consultant workflows. Enabled tracking of application statuses, document reviews, and consultant activity with clear visual insights. Integrated filters for intake periods and streamlined user roles like admin, consultant, and admission manager to optimize the application pipeline.",
    client: "UAPP - (Bluebay IT Ltd.)",
    completionTime: "Running...",
    technologies: "React, Bootstrap, Antd, Reactstrap, ASP.net",
    imageURL:
      "http://res.cloudinary.com/dax7o8z1f/image/upload/v1745639106/rreawisho0o8hiuanyvb.png",
    demo: "",
    github: "",
    status: "active",
  },
  {
    _id: "680d8fb1d72c19dbbfa13b00",
    title: "Trevelle — Explore Beyond",
    description:
      "Trevelle is a modern travel booking platform offering curated tours to exciting destinations worldwide. With services like hotel booking, travel planning, and safety guidance, it simplifies your journey from dream to reality. Flexible pricing plans and a clean, intuitive design make it perfect for travelers seeking adventure and comfort.",
    client: "Personal Project",
    completionTime: "1 month",
    technologies: "HTML, CSS, Javascript",
    imageURL:
      "http://res.cloudinary.com/dax7o8z1f/image/upload/v1745719216/s4oplqo6t5cefgkbvpx5.png",
    demo: "https://mohammadsiam.github.io/theTrevelle/",
    github: "https://github.com/MohammadSiam/theTrevelle?tab=readme-ov-file",
    status: "active",
  },
  {
    _id: "680c55929c9c80072981511d",
    title: "Trillo Hotel Booking",
    description:
      "It features a clean and responsive layout built with HTML and CSS, showcasing a fictional hotel named Hotel Las Palmas located in Albufeira, Portugal. The site includes sections for hotel details, user reviews, and booking availability. Navigation options for Hotels, Flights, Car Rentals, and Tours are present, suggesting a comprehensive travel booking platform. Overall, the project serves as a design prototype or UI concept for a hotel booking application.",
    client: "Personal Project",
    completionTime: "15 days",
    technologies: "HTML, CSS, SCSS",
    imageURL:
      "http://res.cloudinary.com/dax7o8z1f/image/upload/v1745638802/gxk1eywmz2mzz5wlkplj.png",
    demo: "https://mohammadsiam.github.io/Trillo_hotel_booking",
    github: "https://github.com/MohammadSiam/Trillo_hotel_booking",
    status: "active",
  },
  {
    _id: "pro_vendzo",
    title: "Vendzo – Multi-Tenant Business Management & POS System",

    description:
      "Built a scalable multi-tenant REST API backend for a full-featured business management platform. Covers purchase management with multi-payment and installment support, sales processing, purchase & sales returns, expense tracking, and supplier/customer management. Includes a product catalog with serial number and warranty tracking, real-time stock monitoring, profit/loss reporting, investment and withdrawal tracking, and role-based access control with granular permission codes. Activity logging with auto-redaction and a separate DB error log are built in globally.",

    client: "Stackleo",
    completionTime: "Ongoing",
    technologies:
      "NestJS,TypeScript ,TypeORM,MySQL ,JWT,Passport,class-validator,Puppeteer,Swagger,Docker",
    imageURL:
      "https://res.cloudinary.com/dax7o8z1f/image/upload/v1778777454/screencapture-217-15-164-200-3004-dashboard-2026-05-14-22_50_30_ufgczs.png",
    demo: "",
    github: "",
    status: "active",
  },
];
