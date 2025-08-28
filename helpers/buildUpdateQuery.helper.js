function buildUpdateQuery(table, id, fields) {
  const keys = Object.keys(fields);
  if (!keys.length) return null;

  const setClause = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");
  const values = keys.map((k) => fields[k]);

  const sql = `UPDATE ${table} SET ${setClause} WHERE id=$${keys.length + 1} RETURNING *`;

  return { sql, values: [...values, id] };
}

module.exports = buildUpdateQuery;
