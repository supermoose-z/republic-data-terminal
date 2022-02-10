
import axios from 'axios';
import { createStore } from 'vuex';

// app state storage and management
export default createStore({
	state()
	{
		return {
			// character data being displayed, null if none is being displayed
			character: null,

			// loading character data?
			loading: false,
			
			// error if failed to load
			error: null,
		}
	},

	mutations: {
		// set current character data
		setCharacter(state, char)
		{
			if (char == null)
				state.character = null;
			else
				state.character = { ...char };
		},

		// set loading state
		setLoading(state, flag)
		{
			state.loading = flag;
		},

		setError(state, error)
		{
			state.error = error;
		}
	},

	actions: {
		// fetch character from API
		async fetchCharacter({ commit }, id)
		{
			commit('setLoading', true);
			commit('setError', null);

			try
			{
				// attempt to get character data
				var result = await axios.get(`/characters/${id}`);

				// load character data into state
				commit('setCharacter', result.data.character);
			}
			catch(err)
			{
				// if ajax error
				if (err.isAxiosError)
					commit('setError', err.response.data.error);
				// otherwise display generic message
				else
					commit('setError', err.message);
			}
			finally
			{
				commit('setLoading', false);
			}
		}
	}
});