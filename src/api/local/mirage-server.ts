import { Model, createServer } from 'miragejs';

import { Task } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

export const makeServer = ({ environment = 'test' } = {}) => {
    let server = createServer({
        environment,
        models: {
            task: Model.extend<Partial<Task>>({}),
        },
        seeds(server) {
            server.create('task', {
                id: '8e09dc16-0efb-474b-b991-dc2e8e89c4c3', title: 'Work Period', duration: '10AM - 12PM', startTime: 1000, endTime: 1200, date: new Date()
            })
        },
        routes() {
            this.namespace = 'api'

            this.get('/task', (schema) => {
                console.log(...schema.db.task);
                return [...schema.db.task];
            });

            this.post('/task/', (schema, request) => {
                const attributes = JSON.parse(request.requestBody)

                attributes.id = uuidv4();

                schema.create('task', {
                    ...attributes
                });

                return attributes;
            });

            this.put('/task/:id', (schema, request) => {
                const attributes = JSON.parse(request.requestBody);

                schema.find('task', request.params.id)?.update(attributes);

                return attributes;
            });

            this.del('task/:id', (schema, request) => {
                schema.find('task', request.params.id)?.destroy();

                return true;
            });
        }
    });

    return server;
}