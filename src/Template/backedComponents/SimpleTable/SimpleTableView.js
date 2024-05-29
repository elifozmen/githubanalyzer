import React from "react";
import {  
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Table
} from "reactstrap";

export function SimpleTableView(props) {
    return(
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Card style={{ width: '90%', fontSize: '20px', marginTop: '20px' }}>
                <CardHeader>
                    <CardTitle tag="h4"></CardTitle>
                </CardHeader>
                <CardBody style={{ width: '100%', fontSize: '20px' }}>
                    <Table className="tablesorter" responsive>
                        <thead className="text-primary" style={{fontSize: '20px'}}>
                        <tr>
                            {props.dataHeaders.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {props.data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {props.dataHeaders.map((headerItem, colIndex) => (
                                    <td key={colIndex}>{item[headerItem]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}
