
import React, { Component } from 'react';
import CardBox from '../../../../../components/CardBox/index';
import IntlMessages from '../../../../../util/IntlMessages';
import CategoryList from './CategoryList';


class  Category extends Component {
    render() {
        return (
            <div className="table-responsive-material">
                <CardBox styleName="col-12" cardStyle="mb-0 p-0" heading={<IntlMessages id="categoryList.title" />}
                    headerOutside>
                    <CategoryList />
                </CardBox>
            </div>
        );
    }
}

export default  Category;