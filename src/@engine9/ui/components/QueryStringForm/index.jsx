import React, { useState } from 'react';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { useSearchParams } from 'react-router';
import JSON5 from 'json5';
import { Button } from 'antd';

function QueryStringForm(props) {
  const { fields } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  let initQuery = { combinator: 'and', rules: [] };
  const rules = searchParams.get('rules');
  if (rules) initQuery = { combinator: 'and', rules: JSON5.parse(rules) };
  const [query, setQuery] = useState(initQuery);

  return (
    <div className="query-string-form">
      <QueryBuilderAntD key="query-builder">
        <QueryBuilder
          listsAsArrays
          controlElements={{
            addGroupAction: null,
            combinatorSelector: null,
          }}
          fields={fields}
          query={query}
          onQueryChange={
              (newQuery) => {
                setQuery(newQuery);
              }
            }
        />
      </QueryBuilderAntD>
      <Button
        variant="solid"
        color="primary"
        key="save"
        onClick={() => {
          const cleanedQuery = JSON5.parse(formatQuery(query, 'json_without_ids'));
          const p = { ...searchParams, rules: JSON5.stringify(cleanedQuery.rules) };
          setSearchParams(p);
        }}
      >
        Apply Rules
      </Button>

    </div>
  );
}

export default QueryStringForm;
export { QueryStringForm };
