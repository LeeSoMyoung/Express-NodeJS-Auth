'use strict';

import LogInView from './views/js/LogInView.js';
import HomeView from './views/js/HomeView.js';
import SignUpView from './views/js/SignUpView.js';
import NotFoundView from './views/js/NotFoundView.js';

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: '/', view: HomeView },
        { path: '/login', view: LogInView },
        { path: '/sign-up', view: SignUpView }
    ];

    const pathLists = routes.map((route)=>{
        return {
            route: route,
            isMatch: location.pathname ===route.path
        }
    });

    let matchedPath = pathLists.find((path)=>path.isMatch);

    if(!matchedPath){
        matchedPath={
            route:{
                path:location.pathname,
                view: NotFoundView
            },
            isMatch: true
        }
    }

    const view = new matchedPath.route.view();

    const app = document.querySelector('#app');

    app.innerHTML = await view.getHtml();

    view.attachEvent();

};

export { router, navigateTo };