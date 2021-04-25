/**
 * 存储的是角色对应的权限名称
 */
const roleToTouter = {
  coustomer: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'ProductEdit',
    },
  ],
  admin: [
    {
      name: 'Product',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'ProductAdd',
    },
    {
      name: 'category',
    },
    {
      name: 'ProductEdit',
    },
  ],
};

export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleToTouter[role].map((item) => item.name);
  const result = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      obj.children = obj.children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return result;
}
