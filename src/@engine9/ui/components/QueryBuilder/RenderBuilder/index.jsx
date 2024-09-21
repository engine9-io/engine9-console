import React, { useState } from 'react';
import { Button } from 'antd';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import 'react-querybuilder/dist/query-builder.scss';
// import { fields } from './fields';
import './styles.css';

export const validator = (r) => !!r.value;

export default function App(props) {
  const { query: queryProperty, fields: fieldsProp, onSubmit = () => {} } = props;
  if (typeof queryProperty === 'string') return 'query is a string, must be an object';
  const initialQuery = JSON.parse(JSON.stringify(queryProperty));
  initialQuery.combinator = initialQuery.combinator || 'and';
  initialQuery.rules = initialQuery.rules || [];
  const [query, setQuery] = useState(initialQuery);

  const fieldsWithValidator = fieldsProp.map((f, i) => ({ validator, ...fieldsProp[i] }));

  return (
    <div>
      <QueryBuilderAntD>
        <QueryBuilder
          listsAsArrays
          fields={fieldsWithValidator}
          query={query || {}}
          onQueryChange={setQuery}
        />
      </QueryBuilderAntD>
      {formatQuery(query, 'json_without_ids')}

      <Button
        type="primary"
        onClick={() => onSubmit(formatQuery(query, 'json_without_ids'))}
      >
        Save
      </Button>
    </div>
  );
}
