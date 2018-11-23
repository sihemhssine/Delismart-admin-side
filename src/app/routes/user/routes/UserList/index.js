   
import React, {Component} from 'react';
import CardBox from '../../../../../components/CardBox/index';
import IntlMessages from '../../../../../util/IntlMessages';
import UserList  from './UserList';

class User  extends Component {
    render() {
         return (
            <div className="table-responsive-material">
          <CardBox styleName="col-12" cardStyle="mb-0 p-0" heading={<IntlMessages id="userList.title"/>}
                     headerOutside>
                <UserList/>
            </CardBox> 
            </div>
        );
    }
}

export default  User ;