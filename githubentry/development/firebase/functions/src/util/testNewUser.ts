import IUser from "../interfaces/user/user";

const getNewUser = (user: any): IUser => {
    let t = Date.now()-1000*60*60*24*356*5-(Math.random() * 1000*60*60*24*356*30);
    return {
      id: user.uid,
      roles: ["client"],
      is_admin: Math.random() > 0.97,
      is_coach: Math.random() > 0.9,
      is_client: Math.random() > 0.5,
      sallary: `${Math.floor(Math.random()*9000)/100}`,
      access_level: Math.floor(Math.random()*3)*1000,
      created_at: Date.now()-1000000000*Math.random(),
      last_update: Date.now(),
      linked: Math.random()>0.4,
  
      form_of_adress: Math.random() > 0.5 ? "Herr" : "Frau",
      first_name: user.first_name,
      last_name: user.last_name,
      street: "Wenkenstrasse",
      house_number: "86",
      postal_code: "4125",
      city: "Riehen",
      country_ISO2: "CH",
      country: "Schweiz",
      portrait_url: null,
  
      phone_numbers: ["079"+Math.floor(Math.random()*10000000).toString()],
      phone_number: Math.random()>0.3 ? "079"+Math.floor(Math.random()*10000000).toString() : "",
      date_of_birth: t,
      email: user.email ? user.email : "",
      preffered_language: Math.random() > 0.5 ? "d" : "e",
  
      status: Math.random() < 0.9 ? Math.random() < 0.8 ? "created" : "issue" : Math.random() < 0.8 ? "active" : "error",
  
      //  LinkedAccounts
      parents: [],
      parent_ids: [],
      children: [],
      
      // ChatRooms
      new_messages: [
        {
          id: Math.random().toString(),
          sender_id: "admin",
          message: "Wilkommen in der Schwimmschule beider Basel",
          time_numeric: Date.now(),
        }
      ],
      availability: "always",
      
      // Courses
      courses: [],
      
      //  Invoices
      invoice_delivery: "email",
    }
  }

export default getNewUser