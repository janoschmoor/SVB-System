import React, { useContext, useEffect, useState } from 'react'
import { loadDocument, loadDocumentSnapshot } from '../services/firestore/firestore';

const SystemContext = React.createContext<any>({
  SCHEMA: null,
  CONVERTERS: null,
  SystemState: null,
});

const SYSTEM_DEFAULT_STATE = {
  query: {
      users: {
          keys: [
              { key: "status", disp: "#", isDefaultTable: true, type: "select", selectOptions: [{key: "created", disp: "Neu"}, {key: "active", disp: "Aktiv"}, {key: "error", disp: "Fehler"}, {key: "issue", disp: "Problem"}]},
              { key: "first_name", disp: "Vorname", isDefaultTable: true, type: "text" },
              { key: "last_name", disp: "Nachname", isDefaultTable: true, type: "text" },
              { key: "email", disp: "Email", isDefaultTable: true, type: "text" },
              { key: "date_of_birth", disp: "Geburtstag", isDefaultTable: true, type: "date" },
              { key: "roles", disp: "Rollen", type: "list-select" },
              { key: "isAdmin", disp: "Admin", type: "boolean" },
              { key: "isCoach", disp: "SL", type: "boolean" },
              { key: "isClient", disp: "Kunde", type: "boolean" },
              { key: "form_of_address", disp: "Anrede", type: "text" },
              { key: "phone_number", disp: "Telefonnummer", type: "text" },
              { key: "preffered_language", disp: "Sprache", type: "select", selectOptions: [{key: "d", disp: "Deutsch"}, {key: "f", disp: "Français"}, {key: "i", disp: "Italiano"}, {key: "e", disp: "English"}, {key: "d", disp: "Deutsch"}, {key: "f", disp: "Français"}, {key: "i", disp: "Italiano"}, {key: "e", disp: "English"}] },
          ],
      },
      courses: {

      }
  }
}
export const FIELD_TYPES = [

    { key: "text", disp: "Text", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Text"}]] },
    { key: "email", disp: "Email", type: "email", structure: "direct", searchTextConfig: [[{key: "title", disp: "Email"}]] },
    { key: "boolean", disp: "Boolean", type: "boolean", structure: "direct", searchTextConfig: [[{key: "title", disp: "Boolean"}]] },
    { key: "date", disp: "Datum", type: "date", structure: "direct", searchTextConfig: [[{key: "title", disp: "Datum"}]] },
    { key: "select", disp: "Auswahl", type: "select", structure: "direct", selectOptions: [{key: "always", disp: "Immer", variant:"success"}, {key: "never", disp: "Nie", variant:"danger"}, {key: "post", disp: "Post", variant:"info"}, {key: "email", disp: "Email", variant:"primary"}, {key: "created", disp: "Neu", variant:"info"}, {key: "issue", disp: "Problem", variant:"warning"}, {key: "error", disp: "Fehler", variant:"danger"}, {key: "active", disp: "Aktiv", variant:"success"}], searchTextConfig: [[{key: "title", disp: "Auswahl"}]] },
    { key: "number", disp: "Zahl", type: "number", structure: "direct", searchTextConfig: [[{key: "title", disp: "Zahl"}]] },
    { key: "map", disp: "Objekt", type: "map", structure: "direct", searchTextConfig: [[{key: "title", disp: "Objekt"}]] },

    // USER
    { key: "id", disp: "UID", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "UID"}]] },
    { key: "access_level", disp: "Auth Level", type: "number", structure: "direct", searchTextConfig: [[{key: "title", disp: "Auth Level"}]] },
    { key: "roles", disp: "Funktionen", type: "text", structure: "list", searchTextConfig: [[{key: "title", disp: "Funktionen"}]] },
    { key: "form_of_adress", disp: "Anrede", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Anrede"}]] },
    { key: "first_name", disp: "Vorname", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Vorname"}]] },
    { key: "last_name", disp: "Nachname", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Nachname"}]] },
    { key: "portrait_url", disp: "Profilbild URL", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Profilbild URL"}]] },
    { key: "email", disp: "Email", type: "email", structure: "direct", searchTextConfig: [[{key: "title", disp: "Email"}]] },
    { key: "phone_number", disp: "Telefonnummer", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Telefonnummer"}]] },
    { key: "phone_numbers", disp: "Telefonnummern", type: "text", structure: "list", searchTextConfig: [[{key: "title", disp: "Telefonnummern"}]] },
    { key: "date_of_birth", disp: "Geburtstag", type: "date", structure: "direct", searchTextConfig: [[{key: "title", disp: "Datum"}], [{key: "<=", disp: "vor"}, {key: ">=", disp: "nach"}]] },
    { key: "linked", disp: "Auth", type: "boolean", structure: "direct", searchTextConfig: [[{key: "title", disp: "Auth"}]] },
    { key: "is_admin", disp: "Admin", type: "boolean", structure: "direct", searchTextConfig: [[{key: "title", disp: "Admin"}]] },
    { key: "is_coach", disp: "SL", type: "boolean", structure: "direct", searchTextConfig: [[{key: "title", disp: "Sl"}]] },
    { key: "is_client", disp: "Kunde", type: "boolean", structure: "direct", searchTextConfig: [[{key: "title", disp: "Kunde"}]] },
    { key: "created_at", disp: "Erstellt", type: "date", structure: "direct", searchTextConfig: [[{key: "title", disp: "Erstellt"}], [{key: "<=", disp: "vor"}, {key: ">=", disp: "nach"}]] },
    { key: "last_update", disp: "Letztes Update", type: "date", structure: "direct", searchTextConfig: [[{key: "title", disp: "Letztes Update"}], [{key: "<=", disp: "vor"}, {key: ">=", disp: "nach"}]] },
    { key: "status", disp: "Status", type: "select", structure: "direct", selectOptions: [{key: "created", disp: "Neu", variant:"info"}, {key: "issue", disp: "Problem", variant:"warning"}, {key: "error", disp: "Fehler", variant:"danger"}, {key: "active", disp: "Aktiv", variant:"success"}], searchTextConfig: [[{key: "title", disp: "Status"}]]  },
    { key: "invoice_delivery", disp: "Zahlungsbestätigung per", type: "select", structure: "direct", selectOptions: [{key: "email", disp: "Email", variant:"primary"}, {key: "post", disp: "Post", variant:"info"}], searchTextConfig: [[{key: "title", disp: "Zahlungsbestätigung per"}]]  },
    { key: "parents", disp: "Eltern", type: "map", structure: "list", mapTo: "users", searchTextConfig: [[{key: "title", disp: "Eltern"}]] },
    { key: "country", disp: "Land", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Land"}]] },
    { key: "city", disp: "Stadt", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Stadt"}]] },
    { key: "new_messages", disp: "Nachrichten", type: "map", structure: "list", mapTo: "messages", searchTextConfig: [[{key: "title", disp: "Nachrichten"}]] },
    { key: "house_number", disp: "Hausnummer", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Hausnummer"}]] },
    { key: "availability", disp: "Erreichbarkeit", type: "select", structure: "direct", searchTextConfig: [[{key: "title", disp: "Erreichbarkeit"}]], selectOptions: [{key: "always", disp: "Immer", variant:"success"}, {key: "never", disp: "Nie", variant:"danger"}] },
    { key: "parent_ids", disp: "Eltern UIDs", type: "text", structure: "list", searchTextConfig: [[{key: "title", disp: "Eltern UIDs"}]] },
    { key: "country_ISO2", disp: "Land Abk.", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Land Abk."}]] },
    { key: "sallary", disp: "Lohn/Std", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Lohn/Std"}]] },
    { key: "preffered_language", disp: "Sprache", type: "select", structure: "direct", searchTextConfig: [[{key: "title", disp: "Sprache"}]], selectOptions: [{key: "d", disp: "Deutsch"}, {key: "f", disp: "Français"}, {key: "i", disp: "Italiano"}, {key: "e", disp: "English"}] },
    { key: "children", disp: "Kinder", type: "map", structure: "list", mapTo: "users", searchTextConfig: [[{key: "title", disp: "Kinder"}]] },
    { key: "courses", disp: "Kurse", type: "map", structure: "list", mapTo: "courses", searchTextConfig: [[{key: "title", disp: "Kurse"}]] },
    { key: "street", disp: "Strasse", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Strasse"}]] },
    { key: "postal_code", disp: "PLZ", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "PLZ"}]] },


    // MESSAGE
    { key: "message", disp: "Nachricht", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Nachricht"}]] },
    { key: "sender_id", disp: "Sender UID", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "Sender UID"}]] },


    // LOGS
    { key: "genId", disp: "GenId", type: "text", structure: "direct", searchTextConfig: [[{key: "title", disp: "ID"}]] },
    
    { key: "generic_map_users", disp: "Vater", type: "map", structure: "direct", mapTo: "users", searchTextConfig: [[{key: "title", disp: "Vater"}]] },
    { key: "generic_list_text", disp: "genericlisttext", type: "text", structure: "list", searchTextConfig: [[{key: "title", disp: "genericlisttext"}]] },
    { key: "generic_number", disp: "genericnumber", type: "number", structure: "direct", searchTextConfig: [[{key: "title", disp: "genericnumber"}]] },
    { key: "generic_list_number", disp: "genericlistnumber", type: "number", structure: "list", searchTextConfig: [[{key: "title", disp: "genericlistnumber"}]] },
    { key: "generic_list_boolean", disp: "genericlistbool", type: "boolean", structure: "list", searchTextConfig: [[{key: "title", disp: "genericlistbool"}]] },
    { key: "generic_list_select", disp: "Stati", type: "select", structure: "list", selectOptions: [{key: "created", disp: "Neu", variant:"info"}, {key: "issue", disp: "Problem", variant:"warning"}, {key: "error", disp: "Fehler", variant:"danger"}, {key: "active", disp: "Aktiv", variant:"success"}], searchTextConfig: [[{key: "title", disp: "Status"}]]  },
    { key: "generic_list_date", disp: "genericlistdate", type: "date", structure: "list", searchTextConfig: [[{key: "title", disp: "genericlistdate"}]] },
    { key: "generic_list_map_users", disp: "Freunde", type: "map", structure: "list", mapTo: "users", searchTextConfig: [[{key: "title", disp: "Freunde"}]] },
]

export const ENTITY_PREVIEW_FIELDS = {
  users: ["first_name", "last_name", "date_of_birth", "email", "phone_number"],
  messages: ["id", "message", "sender_id"],
  courses: ["id", "status"],
  pools: [],
}


export const CONVERTERS = {
    toDate: (n: number) => {
        return new Date(n).toLocaleDateString();
    },
    toTime: (n: number) => {
        return new Date(n).toLocaleTimeString();
    },
    toDateUNIX: (s: string) => {
        const units: Array<string> = s.split("/")
        if (units.length != 3) {return NaN}
        return Date.parse(units[1]+"/"+units[0]+"/"+units[2])
    },
    toString: (m: any) => {
      return JSON.stringify(m);
    },
    fromString: (s: any) => {
      return JSON.parse(s);
    }
}

const SystemProvider = ({children}: {children: any}) => {
    const [ SystemState, setSystemState ] = useState<any>(null);

    useEffect(() => {
        setSystemState(SYSTEM_DEFAULT_STATE)

    }, [])

  const value = {
    SystemState: SystemState,
  }
  return (
    <SystemContext.Provider value={value}>
      {children}
    </SystemContext.Provider>
  )
}

export function useSystem() {
  return useContext(SystemContext);
}

export default SystemProvider;