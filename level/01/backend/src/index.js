const { json } = require('express');
const express = require('express');
const { v4, validate } = require('uuid')
const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json());

const projects = []

function logRequests(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.time(logLabel)

    next()

    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next){
    const { id } = request.params

    if(!validate(id)){
        return response.status(400).json({ error: 'Invalid project ID.'})
    }
    console.log()
    return next()
}

app.use(logRequests)
app.use('/projects/:id', validateProjectId)

app.get('/projects', (req, res) => {
    const { title, owner } = req.query

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.json(results)
})

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;
    
    const project = { id: v4(), title, owner }

    projects.push(project)

    return res.json(project)
})

app.put('/projects/:id', (req, res) => {
    const { id } = req.params
    
    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0){
        return res.status(400).json({ error: 'Project not found.' })
    }

    const { title, owner } = req.body;
    const project = { 
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return res.json(project)
})

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    if(projectIndex < 0){
        return res.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1);

    return res.status(204).json()
})




app.listen(3333, () => {
    console.log('Back-End Started ')
});