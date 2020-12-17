import { Router } from 'express';
import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/appointments', appointmentRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);

export default routes;
