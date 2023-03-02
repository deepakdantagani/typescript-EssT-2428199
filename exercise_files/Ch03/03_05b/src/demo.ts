// let x = { name: "Wruce Bayne" };
// x.id = 1234;



////////////////////

type ContactStatus = "active" | "inactive" | "new";

interface Address {
    street: string;
    province: string;
    postalCode: string;
}

interface Contact {
    id: number;
    name: string;
    status?: ContactStatus;
    address?: Address;
}

interface Query {
    sort?: 'asc' | 'desc';
    matches(val): boolean;
}

function searchContacts(contacts: Contact[], query) {
    return contacts.filter(contact => {
        for (const property of Object.keys(contact)) { [id, name]
            // get the query object for this property
            const propertyQuery = query[property];
            // check to see if it matches
            if (propertyQuery && propertyQuery.matches(contact[property])) {
                return true;
            }
        }

        return false;
    })
}

const filteredContacts = searchContacts(
    [{ id: 123, name: "Carol Weaver" }],
    {
        id: { matches: (id) => id === 123 },
        name: { matches: (name) => name === "Carol Weaver" },
        phoneNumber: { matches: (name) => name === "Carol Weaver" },
    }
);