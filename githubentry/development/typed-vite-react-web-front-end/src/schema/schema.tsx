import { Button } from "react-bootstrap";
import { ArrowClockwise, EnvelopeAt, Eye, PhoneFill, PlusLg, TelephoneOutbound } from "react-bootstrap-icons";
import { CreateUser } from "../services/functions";
import { useNavigate } from 'react-router-dom';

const userPreviewSchema = [
    {
        key: "id",
        display: "ID",
        type: "string",
    },
    {
        key: "first_name",
        display: "Vorname",
        type: "string",
    },
    {
        key: "last_name",
        display: "Nachname",
        type: "string",
    },
    {
        key: "phone_number",
        display: "Telefonnummer",
        type: "string",
    },
    {
        key: "photo_url",
        display: "Foto URL",
        type: "photoUrl",
    },
    {
        key: "date_of_birth",
        display: "Geburtsdatum",
        type: "date",
    },
]

const coursePreviewSchema = [
    {
        key: "id",
        display: "ID",
        type: "string",
    },
    {
        key: "state",
        display: "Status",
        type: "select",
        options: [
            {key: "active", display: "Aktiv", variant: "success"},
            {key: "planned", display: "Geplant", variant: "info"},
            {key: "paused", display: "Pausiert", variant: "warning"},
            {key: "complete", display: "Abgeschlossen", variant: "secondary"},
        ],
    },
    {
        key: "pool_id",
        display: "Schwimmbad ID",
        type: "string",
    },
    {
        key: "number_of_coaches",
        display: "Anzahl Schwimmlehrer",
        type: "number",
    },
]
const poolPreviewSchema = [
    {
        key: "id",
        display: "ID",
        type: "string",
    },
    {
        key: "name",
        display: "Name",
        type: "string",
    },
    {
        key: "location",
        display: "Standort",
        type: "geoLocation",
    },
]



const SCHEMA = [
    {
        type: "db",
        key: "db",
        display: "Firestore Database",
        properties: [
            {
                key: "users",
                type: "collection",
                display: "Nutzersammlung",
                actions: [
                    {
                        render: (props: {onClick?: Function}) => {
                            const navigate = useNavigate();
                            return (
                                <Button className="w-100" variant="outline-primary" onClick={(e: any) => {
                                    // call firebase function to create new user
                                    CreateUser().then((res: any) => {
                                        console.log(res);
                                        navigate('/admin/data-manager', { state: { requestedCollection: "users", constraint: {
                                            type: "text",
                                            value: res.data.data.id,
                                            key: "id",
                                        } } });
                                    }).catch((err) => {
                                        console.error(err);
                                    })
                                }}>Nutzer hinzufügen</Button>
                            )
                        },
                        id: "create",
                    }
                ],
                properties: [
                    {
                        key: "**",
                        type: "customUserObject",
                        display: "Nutzer",
                        disableCreate: true,
                        actions: [
                            {
                                render: (props: {phone?: string}) => {
                                    if (props.phone == undefined || props.phone == "") {
                                        return null;
                                    } 
                                    return <Button  size="sm" variant="outline-primary" onClick={(e: any) => {props.phone ? window.open("tel:"+props.phone) : console.log("props.phone not defined"); e.stopPropagation()}}><TelephoneOutbound /></Button>
                                },
                                id: "call",
                            },
                            {
                                render: (props: {email?: string}) => {
                                    if (props.email == undefined || props.email == "") {
                                        return null;
                                    } 
                                    return <Button size="sm" variant="outline-primary" onClick={(e: any) => {props.email ? window.open("mailto:"+props.email) : console.log("props.email not defined"); e.stopPropagation()}}><EnvelopeAt /></Button>
                                },
                                id: "email",
                            },
                            {
                                render: (props: {onClick?: Function}) => {
                                    return (
                                        <Button size="sm" variant="outline-primary" onClick={(e: any) => {props.onClick ? props.onClick(e) : console.log("no onClick defined")}}><Eye /></Button>
                                    )
                                },
                                id: "inspect",
                            }
                        ],
                        properties: [
                            {
                                key: "id",
                                display: "ID",
                                type: "string",
                                disableChange: true,
                            },
                            {
                                key: "auth_id",
                                display: "Auth ID",
                                type: "string",
                                minViewLevel: 2000,
                                minEditLevel: 2000,
                            },
                            {
                                key: "roles",
                                display: "Tätigkeiten",
                                type: "array",
                                template: "",
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "string",
                                        display: "Tätigkeit",
                                    }
                                ],
                            },
                            {
                                key: "is_admin",
                                display: "Admin",
                                type: "boolean",
                                minEditLevel: 2000,
                            },
                            {
                                key: "is_coach",
                                display: "Schwimmlehrer",
                                type: "boolean",
                                minEditLevel: 2000,
                            },
                            {
                                key: "is_client",
                                display: "Kunde",
                                type: "boolean",
                                minEditLevel: 2000,
                            },
                            {
                                key: "access_level",
                                display: "Zugriffslevel",
                                type: "number",
                                minViewLevel: 2000,
                                disableChange: true,
                            },
                            {
                                key: "created_at",
                                display: "Erstellt",
                                type: "date",
                                disableChange: true,
                            },
                            {
                                key: "last_update",
                                display: "Zuletzt aktualisiert",
                                type: "date",
                                disableChange: true,
                                timeMode: "delta",
                            },
                            {
                                key: "status",
                                display: "Status",
                                type: "select",
                                minEditLevel: 2000,
                                options: [
                                    {key: "active", display: "Aktiv", variant: "success"},
                                    {key: "inactive", display: "Inaktiv", variant: "warning"},
                                    {key: "blank", display: "Leer", variant: "danger"},
                                    {key: "problem", display: "Problem", variant: "danger"},
                                    {key: "error", display: "Fehler", variant: "danger"},
                                    {key: "new", display: "Neu", variant: "info"},
                                ],
                            },
                            {
                                key: "bio",
                                display: "Über mich",
                                type: "textarea",
                                optional: true,
                            },
                            {
                                key: "discount",
                                display: "Rabatt",
                                type: "object",
                                optional: true,
                                minEditLevel: 2000,
                            },
                            {
                                key: "special_pass_name",
                                display: "Spezialpass Name",
                                type: "string",
                                optional: true,
                                minEditLevel: 2000,
                            },
                            {
                                key: "special_pass_valid_until",
                                display: "Spezialpass gültig bis",
                                type: "date",
                                optional: true,
                                minEditLevel: 2000,
                            },
                            {
                                key: "special_pass_reduction",
                                display: "Spezialpass Reduktion",
                                type: "string",
                                optional: true, 
                                minEditLevel: 2000, 
                            },
                            {
                                key: "sallary",
                                display: "Lohn",
                                type: "string",
                                optional: true,
                                minEditLevel: 2000,
                            },
                            {
                                key: "form_of_adress",
                                display: "Anrede",
                                type: "string",
                            },
                            {
                                key: "first_name",
                                display: "Vorname",
                                type: "string",
                            },
                            {
                                key: "last_name",
                                display: "Nachname",
                                type: "string",
                            },
                            {
                                key: "street",
                                display: "Strasse",
                                type: "string",
                            },
                            {
                                key: "house_number",
                                display: "Hausnummer",
                                type: "string",
                            },
                            {
                                key: "postal_code",
                                display: "Postleitzahl",
                                type: "string",
                            },
                            {
                                key: "city",    
                                display: "Stadt",
                                type: "string",
                            },
                            {
                                key: "district",
                                display: "Kanton",
                                type: "string",
                            },
                            {
                                key: "country",
                                display: "Land",
                                type: "string",
                            },
                            {
                                key: "country_ISO2",
                                display: "Land ISO2",
                                type: "string",
                            },
                            {
                                key: "photo_url",
                                display: "Foto URL",
                                type: "photoUrl",
                            },
                            {
                                key: "phone_number",
                                display: "Telefonnummer",
                                type: "string",
                            },
                            {
                                key: "date_of_birth",
                                display: "Geburtsdatum",
                                type: "date",
                            },
                            {
                                key: "email",
                                display: "E-Mail",
                                type: "email",
                                minEditLevel: 2000,
                            },
                            {
                                key: "preferred_language",
                                display: "Bevorzugte Sprache",
                                type: "select",
                                options: [
                                    {key: "d", display: "Deutsch", variant: "secondary"},
                                    {key: "f", display: "Français", variant: "secondary"},
                                    {key: "i", display: "Italiano", variant: "secondary"},
                                    {key: "e", display: "English", variant: "secondary"},
                                ],
                            },
                            {
                                key: "parents",
                                display: "Eltern",
                                type: "array",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "object",
                                        display: "Elternteil",
                                        preview: "users",
                                        properties: userPreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "parent_ids",
                                display: "Eltern IDs",
                                type: "array",
                                template: "",
                                minViewLevel: 2000,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "string",
                                        display: "Eltern ID",
                                    }
                                ],
                            },
                            {
                                key: "children",
                                display: "Kinder",
                                type: "array",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "object",
                                        display: "Kind",
                                        preview: "users",
                                        properties: userPreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "child_ids",
                                display: "Kinder IDs",
                                type: "array",
                                template: "",
                                minViewLevel: 2000,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "string",
                                        display: "Kind ID",
                                    }
                                ],
                            },
                            {
                                key: "booked_courses",  
                                display: "Gebuchte Kurse",
                                type: "array",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "object",
                                        display: "Kurs",
                                        preview: "courses",
                                        properties: coursePreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "booked_course_ids",
                                display: "Gebuchte Kurs IDs",
                                type: "array",
                                template: "",
                                minViewLevel: 2000,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "string",
                                        display: "Kurs ID",
                                    }
                                ],
                            },
                            {
                                key: "coached_courses",
                                display: "Geleitete Kurse",
                                type: "array",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "object",
                                        display: "Geleiteter Kurs",
                                        preview: "courses",
                                        properties: coursePreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "coached_course_ids",
                                display: "Geleitete Kurs IDs",
                                type: "array",
                                template: "",
                                minViewLevel: 2000,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "string",
                                        display: "Geleiteter Kurs ID",
                                    }
                                ],
                            },
                            {
                                key: "invoice_delivery",
                                display: "Rechnungsversand",
                                type: "select",
                                options: [
                                    { key: "email", display: "E-Mail", variant: "primary" },
                                    { key: "post", display: "Post", variant: "secondary" },
                                ],
                            },
                        ]
                    }
                ]
            },
            {
                key: "courses",
                type: "collection",
                display: "Kurssammlung",
                actions: [
                    {
                        render: (props: {onClick?: Function}) => {
                            return (
                                <Button className="w-100" onClick={(e: any) => {props.onClick ? props.onClick(e) : console.log("no onClick defined")}}><ArrowClockwise /></Button>
                            )
                        },
                        id: "refresh",
                    },
                ],
                properties: [
                    {
                        key: "**",
                        type: "object",
                        display: "Kurs",
                        disableCreate: true,
                        properties: [
                            {
                                key: "id",
                                display: "ID",
                                type: "string",
                                disableChange: true,
                            },
                            {
                                key: "code",
                                display: "Code",
                                type: "string",
                                minEditLevel: 2000,
                            },
                            {
                                key: "category",
                                display: "Kategorie",
                                type: "select",
                                minEditLevel: 2000,
                                options: [
                                    { key: "aqua", display: "Aqua", variant: "primary" },
                                    { key: "adult", display: "Erwachsen", variant: "primary" },
                                    { key: "child", display: "Kind", variant: "primary" },
                                    { key: "high_diving", display: "Turmspringen", variant: "primary" },
                                    { key: "diverse", display: "Diverse", variant: "primary" },
                                    { key: "adolescent", display: "Jugendlich", variant: "primary" },
                                    { key: "elki", display: "Eltern Kind", variant: "primary" },
                                ],
                            },
                            {
                                key: "target_group",
                                display: "Zielgruppe",
                                type: "array",
                                template: "aqua",
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "select",
                                        display: "Kateogrie",
                                        options: [
                                            { key: "aqua", display: "Aqua", variant: "primary" },
                                            { key: "adult", display: "Erwachsen", variant: "primary" },
                                            { key: "child", display: "Kind", variant: "primary" },
                                            { key: "high_diving", display: "Turmspringen", variant: "primary" },
                                            { key: "diverse", display: "Diverse", variant: "primary" },
                                            { key: "adolescent", display: "Jugendlich", variant: "primary" },
                                            { key: "elki", display: "Eltern Kind", variant: "primary" },
                                        ],
                                    }
                                ],
                            },
                            {
                                key: "state",
                                display: "Status",
                                type: "select",
                                minEditLevel: 2000,
                                options: [
                                    { key: "planned", display: "Geplant", variant: "primary" },
                                    { key: "active", display: "Aktiv", variant: "primary" },
                                    { key: "paused", display: "Pausiert", variant: "warning" },
                                    { key: "complete", display: "Abgeschlossen", variant: "secondary" },
                                ]
                            },
                            {
                                key: "pool",
                                display: "Schwimmbad",
                                type: "object",
                                minEditLevel: 2000,
                                properties: poolPreviewSchema,
                            },
                            {
                                key: "clients",
                                display: "Teilnehmer Liste",
                                type: "array",
                                template: undefined,
                                minViewLevel: 1000,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        display: "Teilnehmer",
                                        type: "object",
                                        preview: "users",
                                        properties: userPreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "coaches",
                                display: "Schwimmlehrer Liste",
                                type: "array",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        display: "SL",
                                        type: "object",
                                        prewiew: "users",
                                        properties: userPreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "duration",
                                display: "Dauer",
                                type: "number",
                                minEditLevel: 2000,
                            },
                            {
                                key: "start_day",
                                display: "Start Tag",
                                type: "number",
                                minEditLevel: 2000,
                            },
                            {
                                key: "intervall",
                                display: "Intervall",
                                type: "string",
                                minEditLevel: 2000,
                            },
                            {
                                key: "time",
                                display: "Zeit",
                                type: "number",
                                minEditLevel: 2000,
                            },
                            {
                                key: "repetitions",
                                display: "Trainings",
                                type: "number",
                                optional: true,
                                minEditLevel: 2000,
                            },
                            {
                                key: "dates",
                                display: "Kursdaten",
                                type: "array",
                                template: null,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        display: "Kursdatum",
                                        type: "date",
                                    }
                                ],
                            },
                            {
                                key: "absences",    
                                display: "Abwesenheiten",
                                type: "object",
                                minEditLevel: 2000,
                            },
                            {
                                key: "promotions",
                                display: "Beförderungen",
                                type: "array",
                                template: false,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        display: "Beförderung",
                                        type: "boolean",
                                    }
                                ],
                            },
                            {
                                key: "base_cost",
                                display: "Grundkosten",
                                type: "number",
                                minEditLevel: 2000,
                            },
                            {
                                key: "max_clients",
                                display: "Maximale Teilnehmer",
                                type: "number",
                                minEditLevel: 2000,
                            },
                        ]
                    },
                ],
            },
            {
                key: "pools",
                type: "collection",
                display: "Schwimmbadsammlung",
                actions: [
                    {
                        render: (props: {onClick?: Function}) => {
                            return (
                                <Button className="w-100" onClick={(e: any) => {props.onClick ? props.onClick(e) : console.log("no onClick defined")}}><ArrowClockwise /></Button>
                            )
                        },
                        id: "refresh",
                    },
                ],
                properties: [
                    {
                        key: "**",
                        type: "object",
                        display: "Schwimmbad",
                        preview: "pools",
                        properties: [
                            {
                                key: "id",
                                type: "string",
                                display: "ID",
                                disableChange: true,
                            },
                            {
                                key: "name",
                                type: "string",
                                display: "Name",
                                minEditLevel: 2000,
                            },
                            {
                                key: "location",
                                type: "object",
                                display: "Ort",
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "lat",
                                        type: "string",
                                        display: "Breitengrad",
                                    },
                                    {
                                        key: "lng",
                                        type: "string",
                                        display: "Längengrad",
                                    },
                                ],
                            },
                            {
                                key: "contact",
                                type: "object",
                                display: "Kontakt",
                                preview: "users",
                                minEditLevel: 2000,
                                properties: userPreviewSchema,
                            },
                            {
                                key: "courses",
                                type: "array",
                                display: "Kurse",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "object",
                                        display: "Kurs",
                                        preview: "courses",
                                        properties: coursePreviewSchema,
                                    }
                                ],
                            },
                            {
                                key: "availability",
                                type: "array",
                                display: "Verfügbarkeit",
                                template: undefined,
                                minEditLevel: 2000,
                                properties: [
                                    {
                                        key: "**",
                                        type: "object",
                                        display: "Verfügbarkeit",
                                        preview: "users",
                                        properties: userPreviewSchema,
                                    }
                                ]
                            },
                        




                        ],
                    }
                ]
            },
        ]
    },
    {
        key: "string",
        type: "string",
        display: "Text",
        optional: true,
        isGeneric: true,
    },
    {
        key: "number",
        type: "number",
        display: "Zahl",
        optional: true,
        isGeneric: true,
    },
    {
        key: "boolean",
        type: "boolean",
        display: "Wahrheitswert",
        optional: true,
        isGeneric: true,
    },
    {
        key: "array",
        type: "array",
        template: undefined,
        display: "Liste",
        optional: true,
        isGeneric: true,
    },
    {
        key: "date",
        type: "date",
        display: "Datum",
        optional: true,
        isGeneric: true,
    },
    {
        key: "object",
        type: "object",
        display: "Objekt",
        optional: true,
        isGeneric: true,
    },
    {
        key: "null",
        type: "null",
        display: "Keine",
        optional: true,
        isGeneric: true,
    }
];

export default SCHEMA;