/**
 * As the name suggests, miscellaneous items for global use.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class MiscUtils {

	/**
	 * For use in NavLinks as property isActive.
	 * Returns true if the route matches (the default behavior), OR if the route is the root.
	 * For example a page may be the site root, but also a standalone page. You want the same
	 * link to light up either way.
	 *
	 * TODO: Parameterize alternate route?
	 * 
	 * @static
	 * @memberof MiscUtils
	 */
	static isActiveOrRoot(match, location) {
		if (location.pathname === '/') {
			return true;
		} else {
			return (match) ? match.isExact : false;
		}
	}
}

