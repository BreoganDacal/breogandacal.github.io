const projects = [
    {
        title: "Proyecto 1",
        description: "tictactoe.",
        link: "proyectos/tictactoe.html"
    },
    {
        title: "Proyecto 2",
        description: "lanzar la moneda.",
        link: "proyectos/coin-toss.html"
    },
    {
        title: "Proyecto 3",
        description: "Tragaperras.",
        link: "proyectos/slot-machine.html"
    },
    {
        title: "Proyecto 4",
        description: "ajedrez chino.",
        link: "proyectos/Chess-master/index.html"
    }
];

function displayProjects() {
    const projectList = document.getElementById('projectList');
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-4';
        projectCard.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary">Ver Proyecto</a>
                </div>
            </div>
        `;
        projectList.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', displayProjects);
