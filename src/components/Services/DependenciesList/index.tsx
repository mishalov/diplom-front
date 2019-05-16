import React, { SyntheticEvent, FormEvent } from "react";
import { Button, Form, Input, Select, Table } from "antd";
import "./DependenciesList.scss";
import { FormComponentProps } from "antd/lib/form";
import { IStore } from "../../../store/types";
import { Dispatch } from "redux";
import {
  IDependencyToCreate,
  IDependencyListState
} from "../../../store/types/dependencies";
import { DEPENDENCIES } from "../../../store/actionTypes";
import { action } from "typesafe-actions";
import { connect } from "react-redux";
const { create } = Form;
const { Column } = Table;
const { Option } = Select;

const inputStyle = {
  width: "200px",
  marginRight: "16px"
};

interface IDependenciesListProps extends FormComponentProps {
  createDependency: (dependency: IDependencyToCreate) => void;
  getDependenciesList: () => void;
  dependenciesList: IDependencyListState;
}

class DependenciesList extends React.Component<IDependenciesListProps> {
  public componentDidMount() {
    this.props.getDependenciesList();
  }

  public render() {
    const { props } = this;
    console.log("props: ", props);
    const { getFieldDecorator } = props.form;
    const { dependenciesList } = props;
    const handleSubmit = (e: SyntheticEvent<FormEvent>) => {
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {
          props.createDependency(values);
        }
      });
    };

    return (
      <div className="dependencies-list">
        Для использования сторонних пакетов в ваших приложениях, пожалуйста,
        зарегистрируйте их здесь
        <div className="dependencies-control-line">
          <Form onSubmit={handleSubmit}>
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Поле обязательно для заполнения" }
              ]
            })(<Input placeholder="Имя пакета" style={inputStyle} />)}
            {getFieldDecorator("version", {
              rules: [
                { required: true, message: "Поле обязательно для заполнения" }
              ]
            })(<Input placeholder="Версия пакета" style={inputStyle} />)}
            {getFieldDecorator("lang", {
              rules: [
                { required: true, message: "Поле обязательно для заполнения" }
              ]
            })(
              <Select placeholder="Язык" style={inputStyle}>
                <Option value="node">Javascript</Option>
                <Option value="python">Python</Option>
              </Select>
            )}
            <Button type="primary" title="Добавить" htmlType="submit">
              Добавить
            </Button>
          </Form>
        </div>
        <div className="dependencies-list__table">
          <Table
            dataSource={dependenciesList.data}
            loading={dependenciesList.loading}
            locale={{ emptyText: "Зависимостей не зарегистрировано" }}
          >
            <Column title="Название" dataIndex="name" sorter={true} />
            <Column title="Версия" dataIndex="version" sorter={true} />
            <Column title="Язык" dataIndex="lang" sorter={true} />
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  dependenciesList: state.dependencies.dependenciesList
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createDependency: (dependency: IDependencyToCreate) =>
    dispatch(action(DEPENDENCIES.CREATE.REQUEST, dependency)),
  getDependenciesList: () => dispatch(action(DEPENDENCIES.GET.REQUEST))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(create()(DependenciesList));
