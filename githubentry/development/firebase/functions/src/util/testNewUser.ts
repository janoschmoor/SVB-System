import IUser from "../interfaces/user/user";

const getNewUser = (user: any): IUser => {
    let t = Date.now()-1000*60*60*24*356*5-(Math.random() * 1000*60*60*24*356*30);
    return {
      id: user.uid,
      roles: ["client"],
      isAdmin: Math.random() > 0.97,
      isCoach: Math.random() > 0.9,
      isClient: true,
      access_level: 0,
      created_at_numeric: Date.now(),
      last_update_numeric: Date.now(),
      isSelfConnected: false,
  
      form_of_adress: "",
      first_name: user.first_name,
      last_name: user.last_name,
      street: "",
      house_number: "",
      postal_code: "",
      city: "",
      country_ISO2: "",
      country: "",
      portrait_url: null,
  
      phone_numbers: { default: "" },
      // date_of_birth: `${1+Math.floor(Math.random()*31)}.${1+Math.floor(Math.random()*12)}.${2000+Math.floor(Math.random()*10)}`,
      date_of_birth: new Date(t).toLocaleDateString(),
      date_of_birth_numeric: t,
      email: user.email ? user.email : "",
      preffered_language: "d",
  
      status: Math.random() < 0.9 ? Math.random() < 0.8 ? "created" : "issue" : Math.random() < 0.8 ? "active" : "error",
  
      //  LinkedAccounts
      parents: [],
      parentIds: [],
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
      chatrooms: [],
      availability: "always",
      
      // Courses
      courses: [],
      
      //  Invoices
      invoice_delivery: "email",
      invoices: [],
    }
  }

export default getNewUser