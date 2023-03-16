import { server as _server } from '@hapi/hapi';

import Contacts, { length, push, findIndex, splice } from './contacts';

{async () => {
    const server = _server({ 
        port: 3000, 
        host: 'localhost' 
    });

    server.route([
        {
            method: 'POST',
            path: '/contacts',
            handler: (request, h) => {
                const { name, email, phone } = request.payload;
                const id = Contacts[Contacts.length - 1].id + 1;
        
                Contacts.push({
                  id,
                  name,
                  email,
                  phone
                });
        
                const response = h.response({ message: 'Contact added successfully' });
                response.code(201);
                return response;
              },
            
        },
        {
            method: 'GET',
            path: '/contacts',
            handler: () => Contacts,
        },
        {
            method: 'DELETE',
            path: '/contacts/{id}',
            handler: (request, h) => {
                const { id } = request.params;
                const index = Contacts.findIndex((contact) => contact.id === id);
                Contacts.splice(index, 1);

                const response = h.response({ message: 'Contact deleted successfully' });
                response.code(200);
                return response;
            }
        },
    ]); 

    await server.start();
    console.log('Server running on port 3000');
}}