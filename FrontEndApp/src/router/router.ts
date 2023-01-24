import Campaign from '../views/Campaign.vue'
import InfiniteHeist from '../views/InfiniteHeist.vue'
import NotFound from '../views/NotFound.vue'
import Settings from '../views/Settings.vue'

export default class Router {
    private static ROUTES:Array<Route> = [
        { id: 'campaign', path: '/', view: Campaign, default: true },
        { id: 'heist', path: '/heist', view: InfiniteHeist },
        { id: 'settings', path: '/settings', view: Settings }
    ]

    private static NOT_FOUND_ROUTE: Route = { id: '404', path: '/404', view: NotFound }

    static route(path: string) {
        window.location.hash = Router.getRouteByPath(path).path
    }

    static view(path: string) {
        return this.getRouteByPath(path).view
    }

    private static getRouteByPath(path: string) {
        if (path == '') {
            return Router.ROUTES.find(v => v.hasOwnProperty('default')) || Router.NOT_FOUND_ROUTE
        }

        return Router.ROUTES.find(v => v.path == path.slice(1)) || Router.NOT_FOUND_ROUTE
    }
}

export type Route = {
    id: string,
    path: string,
    view: Object,
    default?: boolean
}