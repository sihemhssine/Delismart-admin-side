import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION,
    INSIDE_THE_HEADER
} from 'constants/ActionTypes'; 
import SearchBox from 'components/SearchBox'; 
 import {switchLanguage, toggleCollapsedNav} from 'actions/Setting';
 import LanguageSwitcher from 'components/LanguageSwitcher/index';
import Menu from 'components/TopNav/Menu';
import UserInfoPopup from 'components/UserInfo/UserInfoPopup';
 
class Header extends React.Component {

   onLangSwitcherSelect = (event) => {
        this.setState({
            langSwitcher: !this.state.langSwitcher, anchorEl: event.currentTarget
        })
    };
    onSearchBoxSelect = () => {
        this.setState({
            searchBox: !this.state.searchBox
        })
    };
    onUserInfoSelect = () => {
        this.setState({
            userInfo: !this.state.userInfo
        })
    };
    handleRequestClose = () => {
        this.setState({
            langSwitcher: false,
            userInfo: false, 
            searchBox: false
        });
    };
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: undefined,
            searchBox: false,
            searchText: '', 
            userInfo: false,
            langSwitcher: false,
            pathname:this.props.location.pathname
         }
      
  }
    componentDidUpdate(prevProps ){ 
if(prevProps.location.pathname !== this.props.location.pathname){ 
    this.setState({ pathname:this.props.location.pathname}, ()=>{
        console.log(this.state.pathname)
    }) 
    }
}


    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    updateSearchText(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    render() {
        const {drawerType, locale, navigationStyle, horizontalNavPosition} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';

        return (
            <AppBar
                className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
                <Toolbar className="app-toolbar" disableGutters={false}>
                    {navigationStyle === HORIZONTAL_NAVIGATION ?
                        <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
                            <span className="jr-menu-icon">
                              <span className="menu-icon"/>
                            </span>
                        </div>
                        :
                        <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                                    onClick={this.onToggleCollapsedNav}>
                            <span className="menu-icon"/>
                        </IconButton>
                    }

                    <Link className="app-logo mr-4 d-none d-sm-block" to="/">
                    <img src="images/logo.png" alt={"logo"} title="logo"/>
                    </Link>

              { this.state.pathname === "/app/product/productlist" || this.state.pathname === "/app/user/userlist" ?
               <SearchBox styleName="d-none d-lg-block" placeholder="Search"
                onChange={this.updateSearchText.bind(this)}
               value={this.state.searchText}/>
               :   null 
                }
                      {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
                    <Menu/>}

                    <ul className="header-notifications list-inline ml-auto">
                        <li className="d-inline-block d-lg-none list-inline-item">
                            <Dropdown
                                className="quick-menu nav-searchbox"
                                isOpen={this.state.searchBox}
                                toggle={this.onSearchBoxSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn size-30">
                                        <i className="zmdi zmdi-search zmdi-hc-fw"/>
                                    </IconButton>
                                </DropdownToggle>

                                <DropdownMenu right className="p-0">
                                { this.state.pathname === "/app/product/productlist" || this.state.pathname === "/app/user/userlist" ?
                                   <SearchBox styleName="search-dropdown" placeholder="Search "
                                               onChange={this.updateSearchText.bind(this)}
                                               value={this.state.searchText}/>
                                :null }
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="list-inline-item">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.langSwitcher}
                                toggle={this.onLangSwitcherSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <div className="d-flex align-items-center pointer pt-1">
                                        <i className={`flag flag-24 flag-${locale.icon}`}/>
                                    </div>
                                </DropdownToggle>

                                <DropdownMenu right className="w-50">
                                    <LanguageSwitcher switchLanguage={this.props.switchLanguage}
                                                      handleRequestClose={this.handleRequestClose}/>
                                </DropdownMenu>
                            </Dropdown>


                        </li>
                        <li className="list-inline-item ">
                         <i className="zmdi zmdi-notifications-active icon-alert animated infinite wobble"/>
                         </li>
                        <li className="list-inline-item">
                         <i className="zmdi zmdi-comment-alt-text icon-alert zmdi-hc-fw"/>
                        </li>

                        {navigationStyle === HORIZONTAL_NAVIGATION &&
                        <li className="list-inline-item user-nav">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.userInfo}
                                toggle={this.onUserInfoSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn size-30">
                                        <Avatar
                                            alt='...'
                                            src='http://via.placeholder.com/150x150'
                                            className="size-30"
                                        />
                                    </IconButton>
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <UserInfoPopup/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>}
                    </ul>
                </Toolbar>
            </AppBar>
        );
    }
}
const mapStateToProps = ({settings }) => {
    const {drawerType, locale, navigationStyle, horizontalNavPosition} = settings;
     return {drawerType, locale, navigationStyle, horizontalNavPosition  }
};

 

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, switchLanguage})(Header));