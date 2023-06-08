import { useState } from "react";
import { Button } from "react-bootstrap";
import { ChangeMerger } from "../../../schema/mergeManager";
import DataUI from "../../../schema/DataUI";
import LayoutComponent from "../../../components/Layout";

export default function TestingGroundPage() {

    const dummyChangeObject2 = {
        data: {first_name: "test"},
        path: "db/users/mki8765rfghj",
        changes: [],
    }

    const dummyChangeObject = {
        data: {
            // admin level details
            id: "nkuzgvbnkgvbnjuzgv",
            authId: "87zuikmnbzzthj4",

            roles: [],
            is_admin: false,
            is_coach: false,
            is_client: false,
            access_level: 0,
            created_at: new Date(),
            last_update: new Date(),
            status: "blank",
            discount: null,
            special_pass_name: "",
            special_pass_valid_until: null,
            special_pass_reduction: "", // representing e.g. "15.00" CHF
            sallary: "",

            // personal
            form_of_adress: "",
            first_name: "Micha",
            last_name: "Haldimann",
            street: "Pfauenhof",
            house_number: "69",
            postal_code: "3333",
            city: "Liestal",
            district: "BL",
            country_ISO2: "CH",
            country: "Schweiz",
            photo_url: "",

            phone_number: "0796969696",
            date_of_birth: new Date("1990-01-01"),
            email: "micha.haldimann@edubs.ch",
            preferred_language: "d",

            //  LinkedAccounts
            parents: [],
            parent_ids: [],
            children: [],
            children_ids: [],
            
            // ChatRooms
            
            // Courses
            booked_courses: [{
                id: "iuhkihnkiuh",
                state: "active",
                pool_id: "987zhjkm",
                number_of_coaches: 1,
            },{
                id: "id2",
                state: "planned",
                pool_id: "987zhjkm",
                number_of_coaches: 2,
            }],
            booked_course_ids: ["iuhkihnkiuh", "id2"],
            coaching_courses: [],
            coaching_course_ids: ["9876789ihbnkiuh", "id2", "id3"],

            //  Invoices
            invoice_delivery: "email",
        },
        path: "db/users/mki8765rfghj",
        changes: [],
    }

    const [ obj1, setObj1 ] = useState<{path: string, data: any, changes: string[]}>(dummyChangeObject);

    const [ config, setConfig ] = useState({
        depth: 2,
        editMode: false,
        onChange: (change: any) => {
            console.log(change);
            setObj1((p: any) => {
                const newData = ChangeMerger({...p.data}, p.path, change.change, change.path);
                const newChanges = [...p.changes, change.path];
                const newObj = {
                    path: p.path,
                    data: newData,
                    changes: newChanges
                }
                console.log(newObj, newData)
                return newObj;
            })
        }
    });

    return (
        <>
            <LayoutComponent>

                <Button onClick={() => setConfig((p: any) => {
                    return {editMode: !p.editMode, depth: p.depth, onChange: p.onChange}
                })}>Toggle Edit Mode {config.editMode.toString()}</Button>

                {
                    dummyChangeObject?.data ? 
                        <DataUI data={obj1.data} path={"db/users/mki8765rfghj"} isMain config={config} />
                    :
                        ""
            }

            </LayoutComponent>
        </>
    )

}
