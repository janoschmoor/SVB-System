interface IUser {
    // admin level details
    id: string;
    auth_id: string;

    roles: Array<string>;
    is_admin: boolean;
    is_coach: boolean;
    is_client: boolean;
    access_level: number;
    created_at: Date;
    last_update: Date;
    status: string;
    discount: string | null;
    special_pass_name: string;
    special_pass_valid_until: Date | null;
    special_pass_reduction: string; // representing e.g. "15.00" CHF
    sallary: string;

    // personal
    form_of_adress: string;
    first_name: string;
    last_name: string;
    street: string;
    house_number: string;
    postal_code: string;
    city: string;
    district: string;
    country_ISO2: string;
    country: string;
    photo_url: string | null;
    bio: string;

    phone_number: string;
    date_of_birth: Date | null;
    email: string;
    preferred_language: "d" | "f" | "e" | "i";

    //  LinkedAccounts
    parents: Array<IUserPreview>;
    parent_ids: Array<string>;
    children: Array<IUserPreview>;
    children_ids: Array<string>;
    
    // ChatRooms
    
    // Courses
    booked_courses: Array<ICoursePreview>;
    booked_course_ids: Array<string>;
    coached_courses: Array<ICoursePreview>;
    coached_course_ids: Array<string>;


    //  Invoices
    invoice_delivery: "post" | "email";

}

interface IUserPreview {
    id: string;
    first_name: string;
    last_name: string;
    photo_url: string | null;
    date_of_birth: Date | null;
    phone_number: string;
}

interface ICourse {
    id: string; // gen
    code: string; // template
    category: string; // template
    target_group: Array<"aqua" | "adult" | "high_diving" | "diverse" | "adolescent" | "elki" | "child">; // template
    state: "active" | "planned" | "paused" | "complete"; // template

    pool: IPoolPreview; // template
    clients: Array<IUserPreview>; // template
    coaches: Array<IUserPreview>; // dyn

    duration: number; // template
    start_day: number; // template
    intervall: string; // template
    time: number; // template
    repetitions?: number; // template
    dates: Array<ICourseDate>; // dyn


    absences: any; // dyn
    promotions: Array<boolean>; // dyn

    base_cost: number; // template
    max_clients: number; // template

}

interface ICoursePreview {
    id: string;
    state: string;
    pool_id: string;
    number_of_coaches: number;
}

interface IPool {
    id: string;
    name: string;
    location: IGeoLocation;
    contact: IUserPreview | null;
    courses: Array<ICoursePreview>;
    availability: Array<any>;
}

interface IPoolPreview {
    id: string;
    name: string;
    location: IGeoLocation;
}

interface IInvoice {
    id: string;
    state: "complete" | "failed" | "cancelled" | "open" | "partially-filled";
    title: string;

    sender_id: string;
    reciever_id: string;
    product_id: string;
    product_type: string;
    created_at: Date;
    last_updated: Date;
    amount: number,
    amount_paid: number,
    currency: "CHF" | "EUR" | "USD",
    action: "book-course" | "unbook-course",
    
}

interface IInvoicePreview {
    id: string;
    title: string;
    amount: string;
    currency: string;
    state: "complete" | "failed" | "cancelled" | "open" | "partially-filled";
}


interface ICourseDate {
    date: Date,
    absent: Array<string>,
    participants: Array<string>,
    status: string,
    coaches: Array<IUserPreview>,
}

interface IGeoLocation {
    lat: number;
    lng: number;
}


export {
    IUser,
    IUserPreview,
    ICourse,
    ICoursePreview,
    IPool,
    IPoolPreview,
    IInvoice,
    IInvoicePreview,
}