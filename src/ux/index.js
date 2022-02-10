
import Panel from './Panel.vue';
import PanelBody from './PanelBody.vue';
import Btn from './Btn.vue';
import Loading from './Loading.vue';

const components = {
	Panel, PanelBody, Btn, Loading,
}

// register components globally for easier use
export function registerComponents(app)
{
	for(var name in components)
		app.component(name, components[name]);
}


