export const TABLE_INSTRUCTION = {
    users: [
        { key: "last_name" },
        { key: "first_name" },
        { key: "email" },
        { key: "phone_number" },
        { key: "status" },
    ],
    courses: [
        { key: "id" },
    ],
    logs: [
        { key: "genId" },
    ],
    SYSTEM: [
        { key: "id" },
    ],
}
export const USERS_KEYS = [
    "id",
    "roles",
    "status",
    "first_name",
    "last_name",
    "email",
    "phone_number",
    "date_of_birth",
    "is_admin",
    "is_coach",
    "is_client",
    "created_at",
    "parents",
]
export const COURSES_KEYS = [
    "id",
    "code",
    "start",
    "end",
    "dates",
    "coaches",
    "created_by"
]