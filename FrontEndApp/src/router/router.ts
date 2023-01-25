import Campaign from '../views/Campaign.vue'
import InfiniteHeist from '../views/InfiniteHeist.vue'
import NotFound from '../views/NotFound.vue'
import Settings from '../views/Settings.vue'

export default class Router {
    public static ROUTES:Array<Route> = [
        { id: 'Campaign', path: '/', view: Campaign, icon: 'mdi-plus-circle-multiple-outline', default: true },
        { id: 'Infinite Heist', path: '/heist', view: InfiniteHeist, icon: 'mdi-all-inclusive' },
        { id: 'Settings', path: '/settings', view: Settings, icon: 'mdi-cog-transfer' }
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

        return Router.ROUTES.find(v => v.path == path) || Router.NOT_FOUND_ROUTE
    }
}

export type Route = {
    id: string,
    path: string,
    view: Object,
    icon?: string,
    default?: boolean
}